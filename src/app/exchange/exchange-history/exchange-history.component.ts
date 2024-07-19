import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ExchangesService } from 'src/app/services/exchange.service';
import { SessionService } from 'src/app/services/session.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-exchange-history',
  standalone: true,
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    SharedModule
  ]
})
export class ExchangeHistoryComponent implements OnInit {
  displayedColumns: string[] = ['proposer_receiver', 'status', 'note', 'created_at', 'date', 'action'];
  exchangeHistory: any[] = [];
  userId: string = '';
  page: number = 1;
  limit: number = 10;
  status: string = '';
  loading: boolean = true;
  paginate: any = {};
  sortBy: string = 'asc';

  constructor(
    private exchangesService: ExchangesService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.sessionService.getUserIdFromToken() || '';

    // Fetch URL parameters
    // this.route.queryParams.subscribe(params => {
    //   this.page = params['page'] ? +params['page'] : 1;
    //   this.limit = params['limit'] ? +params['limit'] : 10;
    //   this.status = params['status'] || '';
    // });

    this.getExchangeHistory();
  }

  getExchangeHistory(): void {
    this.loading = true;
    this.exchangesService.getExchangeHistory(this.userId, this.page, this.limit, this.status).subscribe(
      (data: any) => {
        console.log('Exchange History:', data);
        const { exchanges, totalPages, currentPage } = data.data;
        this.exchangeHistory = exchanges;
        this.paginate.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
        this.paginate.currentPage = currentPage;
        this.paginate.totalPages = totalPages;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching exchange history:', error);
        this.loading = false;
      }
    );
  }

  getStatusColor(status: string): string {
    return status === 'Accepted' ? 'green' : 'red';
  }

  setPage(page: number): void {
    this.page = page;
    // this.updateUrlParams();
    this.getExchangeHistory();
  }

  filterByStatus(): void {
    this.page = 1;
    // this.updateUrlParams();
    this.getExchangeHistory();
  }

  // private updateUrlParams(): void {
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       page: this.page,
  //       limit: this.limit,
  //       status: this.status
  //     },
  //     queryParamsHandling: 'merge',
  //     replaceUrl: true,
  //   };

  //   this.router.navigate([], navigationExtras);
  // }
}
