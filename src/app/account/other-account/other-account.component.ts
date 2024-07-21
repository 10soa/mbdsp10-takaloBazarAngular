import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ObjectService } from 'src/app/services/object.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-other-account',
  templateUrl: './other-account.component.html',
  styleUrls: ['./other-account.component.scss']
})
export class OtherAccountComponent implements OnInit {
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

  searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private objectService: ObjectService
  ) { }

  ngOnInit(): void {
    this.loadingMain = true;
    this.loading = true;

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.getUser();
      this.getRelatedObjects();
    });

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(() => {
      this.page = 1;
      this.getRelatedObjects();
    });
  }

  getUser(): void {
    this.userService.getUserProfil(this.userId).subscribe((user: any) => {
      console.log('User', user);
      this.dataUser = user.user;
      this.loadingMain = false;
    }, error => {
      this.loadingMain = false;
      console.error('Error loading user profile', error);
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
      console.log('Objects', response);
      const { objects, currentPage, totalPages } = response.data;
      this.userObjects = objects;
      this.paginate.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
      this.paginate.currentPage = currentPage;
      this.paginate.totalPages = totalPages;
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
}
