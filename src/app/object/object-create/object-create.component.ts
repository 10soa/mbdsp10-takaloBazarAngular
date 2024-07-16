import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Object } from 'src/app/models/object.model';
import { CategoryService } from 'src/app/services/category.service';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  templateUrl: './object-create.component.html',
  styleUrls: ['./object-create.component.scss']
})
export class ObjectCreateComponent implements OnInit {
  object: Object = {
    id: 0,
    name: '',
    description: '',
    image: '',
    category_id: 0,
  };

  categories: Category[] = [];
  file: File | null = null;
  filePreview: string | ArrayBuffer | null = null;
  loading = false;

  constructor(
    private objectService: ObjectService,
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    console.log('Init create Object component');
    this.categoryService.getCategories().subscribe((data: any) => {
      const { categories } = data.data;
      console.log('Categories', categories);
      this.categories = categories;
    });
  }

  createObject(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loading = true;

    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const object = {
          name: this.object.name,
          description: this.object.description,
          category_id: this.object.category_id,
          image_file: base64String
        };

        this.objectService.createObject(object).subscribe(
          (data: any) => {
            console.log('Object created successfully', data);
            this.loading = false;
            this.router.navigate([`/object/${data.id}`]);
          },
          (error) => {
            console.error('Error creating object:', error);
            this.loading = false;
          }
        );
      };
      reader.readAsDataURL(this.file);
    } else {
      const object = {
        name: this.object.name,
        description: this.object.description,
        category_id: this.object.category_id,
        image_file: null
      };

      this.objectService.createObject(object).subscribe(
        (data: any) => {
          console.log('Object created successfully', data);
          this.loading = false;
          this.router.navigate([`/object/${data.id}`]);
        },
        (error) => {
          console.error('Error creating object:', error);
          this.loading = false;
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
      this.previewFile(this.file);
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
