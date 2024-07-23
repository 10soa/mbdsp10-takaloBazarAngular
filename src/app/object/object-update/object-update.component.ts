import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Object } from 'src/app/models/object.model';
import { CategoryService } from 'src/app/services/category.service';
import { ObjectService } from 'src/app/services/object.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-object-update',
  templateUrl: './object-update.component.html',
  styleUrls: ['./object-update.component.scss']
})
export class ObjectUpdateComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  object: Object = {
    id: 0,
    name: '',
    description: '',
    image: '',
    category_id: 0,
  };
  objectId: number = 0;
  change = false;
  imageError: string = '';
  categories: Category[] = [];
  file: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  loading = false;
  ready = false;
  error = '';

  constructor(
    private objectService: ObjectService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('objectId');
    this.objectId = idParam !== null ? parseInt(idParam, 10) : this.objectId;
    console.log('Object ID:', this.objectId);

    this.route.paramMap.subscribe(params => {
      const newIdParam = params.get('objectId');
      this.objectId = newIdParam !== null ? parseInt(newIdParam, 10) : this.objectId;
    });

    this.objectService.getObject(this.objectId).subscribe((data: any) => {
      this.object = data;
      this.filePreview = data.image;
    });

    this.categoryService.getCategories().subscribe((data: any) => {
      const { categories } = data.data;
      console.log('Categories', categories);
      this.categories = categories;
      this.ready = true;
    });


  }

  ngAfterViewInit(): void {
    // Initialisation de fileInput
    if (!this.fileInput) {
      console.error('fileInput is not available');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
     this.imageError = "";
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(" this.filePreview", this.filePreview);
        this.change = true;
        this.filePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  triggerFileInput(): void {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('fileInput is not available');
    }
  }

  removeImage(): void {
    this.filePreview = null;
    this.object.image = undefined;
  }

  updateObject(form: NgForm): void {
    this.error = '';
    if (form.invalid) {
      return;
    }
    if(!this.filePreview && !this.object.image){
      this.imageError = "Veuillez télécharger une image.";
      return;
    }
    this.loading = true;
    const object = {
      name: this.object.name,
      description: this.object.description,
      category_id: this.object.category_id,
      image_file: this.filePreview && this.change ? this.filePreview : undefined,
      image: this.object.image
    };
    

    this.objectService.updateObject(this.objectId,object).subscribe(
      (data: any) => {
        console.log('Object updated successfully', data.data);
        this.loading = false;
        this.router.navigate([`/object/${data.data.id}`]);
      },
      (error) => {
        console.error('Error updating object:', error.headers);
        this.error = error.status!==500 ?  error.error.error : '';
        this.loading = false;
      }
    );
  }

  gotoFiche(){
    console.log('oka');
    
    this.router.navigate([`/object/${this.objectId}`]);
  }
}
