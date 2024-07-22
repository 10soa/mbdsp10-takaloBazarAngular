import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ObjectService } from 'src/app/services/object.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-objects',
  templateUrl: './user-objects.component.html',
  styleUrls: ['./user-objects.component.scss']
})
export class UserObjectsComponent implements OnInit {
  loading = false;
  loadingMain = false;
  dataUser?: User;
  userObjects: any[] = [];
  userId: string = '';
  page: number = 1;
  limit: number = 10;
  name: string = '';
  order_by: string = 'created_at';
  order_direction: string = 'asc';
  paginate: any = {};
  dialogRef !: MatDialogRef<UserObjectsComponent>;
  searchSubject: Subject<string> = new Subject<string>();

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private objectService: ObjectService
  ) { }

  ngOnInit(): void {
    console.log("data", this.data);
    
    this.userId = this.data;
    this.loadingMain = true;
    this.loading = true;

    this.getRelatedObjects();

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.page = 1;
      this.getRelatedObjects();
    });
  }

  getRelatedObjects(): void {
    this.loading = true;
    const queryParams = {
      page: this.page,
      limit: this.limit,
      name: this.name,
      user_id: this.userId,
      order_by: this.order_by,
      order_direction: this.order_direction
    };

    this.objectService.getUserObjects(queryParams).subscribe((response: any) => {
      const { objects, currentPage, totalPages } = response.data;
      this.userObjects = objects;
      this.paginate.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
      this.paginate.currentPage = currentPage;
      this.paginate.totalPages = totalPages;
      this.loadingMain = false;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error('Error loading user objects', error);
    });
  }

  setPage(page: number): void {
    this.page = page;
    this.getRelatedObjects();
  }

  onSortingChange(sortDirection: string): void {
    this.order_direction = sortDirection;
    this.getRelatedObjects();
  }

  onSearchChange(): void {
    this.searchSubject.next(this.name);
  }

  close(){
    this.dialogRef.close();
  }
  
  add(object: any){
    this.dialogRef.close(object); 
  }

  
  setDialogRef(dialogRef: MatDialogRef<UserObjectsComponent>) {
    this.dialogRef = dialogRef;
  }
}
