import { Component } from '@angular/core';
import { Router } from '@angular/router';
import category_data from 'src/app/shared/data/category-data';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { ICategoryType } from 'src/app/shared/types/category-d-t';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent {

  public searchText: string = '';
  public productType: string = '';
  listeCategory : Category [] = [];
  loading = false;

  constructor (
    public utilsService:UtilsService,
    private router: Router,
    private categoryService : CategoryService
  ){};


   // Get all the children from the category_data array
   public allChildren: string[] = category_data.reduce((children: string[], category: ICategoryType) => {
    if (category.children && category.children.length > 0) {
      children.push(...category.children);
    }
    return children;
  }, []);

  // Create a new unique children array
  public uniqueChildren = [...new Set(this.allChildren)];

  handleProductType(productType: string) {
    if(productType === this.productType){
      this.productType = '';
    }
    else {
      this.productType = productType;
    }
  }

  ngOnInit(){
      this.loadCategory();
  }

  handleSearchSubmit() {
    const queryParams: { [key: string]: string | null } = {};
    if(!this.searchText && !this.productType){
      return
    }
    else {
      if (this.searchText) {
        queryParams['name'] = this.searchText.split(' ').join('-');
      }
      if (this.productType) {
        queryParams['category_id'] = this.productType;
      }
      this.router.navigate(['/object/search'], { queryParams });
    }
  }

  /* Appel API */
  loadCategory(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe((data: any) => {
      const { categories } = data.data;
      console.log('Categories', categories);
      this.listeCategory = categories;
    });
  }
} 
