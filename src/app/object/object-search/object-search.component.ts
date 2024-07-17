import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Object } from 'src/app/models/object.model';
import { CategoryService } from 'src/app/services/category.service';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-object-search',
  templateUrl: './object-search.component.html',
  styleUrls: ['./object-search.component.scss']
})
export class ObjectSearchComponent implements OnInit {
  public objects: Object[] = [];
  public categories: Category[] = [];
  public pageNo: number = 1;
  public pageSize: number = 12;
  public paginate: any = {};
  public sortBy: string = 'asc';
  public itemStart: number = 1;
  public itemEnd: number = this.pageSize;
  public loading: boolean = false;  // New loading state

  public name: string = '';
  public description: string = '';
  public category_id: number | null = null;
  public created_at_start: string = '';
  public created_at_end: string = '';

  constructor(
    private objectService: ObjectService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetch URL parameters
    this.route.queryParams.subscribe(params => {
      this.name = params['name'] || '';
      this.description = params['description'] || '';
      this.category_id = params['category_id'] ? +params['category_id'] : null;
      this.created_at_start = params['created_at_start'] || '';
      this.created_at_end = params['created_at_end'] || '';
    });

    this.loadObjects();
    this.loadCategories();
  }

  filter() {
    this.pageNo = 1;
    this.updateUrlParams();
    this.loadObjects();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      const { categories } = data.data;
      console.log('Categories', categories);
      this.categories = categories;
    });
  }

  loadObjects(): void {
    this.loading = true;  // Start loading
    const filters = {
      name: this.name,
      description: this.description,
      category_id: this.category_id,
      created_at_start: this.created_at_start,
      created_at_end: this.created_at_end
    };

    this.objectService.getObjects(this.pageNo, this.pageSize, this.sortBy, filters).subscribe(data => {
      console.log('objects', data);
      this.objects = data.objects;
      this.paginate.pages = Array(data.totalPages).fill(0).map((x, i) => i + 1);
      this.paginate.currentPage = data.currentPage;
      this.itemStart = data.objects.length > 0 ? ((data.currentPage - 1) * this.pageSize) + 1 : 0;
      this.itemEnd = Math.min(this.itemStart + this.pageSize - 1, data.totalPages * this.pageSize);
      this.loading = false;  // End loading
    }, error => {
      this.loading = false;  // End loading on error
      console.error('Error loading objects', error);
    });
  }

  onSortingChange(newSort: string): void {
    this.pageNo = 1;
    this.sortBy = newSort;
    this.loadObjects();
  }

  setPage(page: number): void {
    this.pageNo = page;
    this.loadObjects();
  }

  resetFilters(): void {
    this.name = '';
    this.description = '';
    this.category_id = null;
    this.created_at_start = '';
    this.created_at_end = '';
    this.updateUrlParams();
    this.loadObjects();
  }

  private updateUrlParams(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        name: this.name,
        description: this.description,
        category_id: this.category_id,
        created_at_start: this.created_at_start,
        created_at_end: this.created_at_end,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    };

    this.router.navigate([], navigationExtras);
  }
}
