import { Component, OnInit } from '@angular/core';
import { ObjectService } from 'src/app/services/object.service';
import { SessionService } from 'src/app/services/session.service';
import { Object } from 'src/app/models/object.model';

@Component({
  selector: 'app-my-objects',
  templateUrl: './my-objects.component.html',
  styleUrls: ['./my-objects.component.scss']
})
export class MyObjectsComponent implements OnInit {
  objects: Object[] = [];
  loading: boolean = false;
  sortBy: string = 'asc';
  page: number = 1;
  limit: number = 20;
  totalItems: number = 0;
  itemStart: number = 1;
  itemEnd: number = 0;
  paginate: any = {};

  constructor(
    private objectService: ObjectService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getMyObjects();
  }

  getMyObjects(): void {
    this.loading = true;
    const userId = Number(this.sessionService.getUserIdFromToken()); 
    if (userId) {
      this.objectService.getUserObjects(userId, { page: this.page, limit: this.limit }).subscribe(
        (response: any) => {
          this.objects = response.data.objects;
          this.totalItems = response.data.totalItems || this.objects.length; 
          this.itemStart = (this.page - 1) * this.limit + 1;
          this.itemEnd = Math.min(this.page * this.limit, this.totalItems);
          this.paginate.pages = Array(response.data.totalPages).fill(0).map((x, i) => i + 1);
          this.paginate.currentPage = this.page;
          this.paginate.totalPages = response.data.totalPages;
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
          console.error('Error fetching user objects:', error);
        }
      );
    }
  }

  setPage(page: number): void {
    this.page = page;
    this.getMyObjects();
  }

  onSortingChange(sortDirection: string): void {
    this.sortBy = sortDirection;
    this.getMyObjects();
  }
}
