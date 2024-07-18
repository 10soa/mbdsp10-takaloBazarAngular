import { Component, OnInit } from '@angular/core';
import { ExchangesService } from 'src/app/services/exchange.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnInit {
  displayedColumns: string[] = ['proposer_receiver', 'status', 'note', 'created_at', 'action'];
  exchangeHistory: any[] = [];
  userId: string = '';
  page: number = 1;
  limit: number = 10;
  status: string = '';

  constructor(
    private exchangesService: ExchangesService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.userId = this.sessionService.getUserIdFromToken() || '';
    this.getExchangeHistory();
  }

  getExchangeHistory(): void {
    this.exchangesService.getExchangeHistory(this.userId, this.page, this.limit, this.status).subscribe(
      (data: any) => {
        console.log('Exchange History:', data);
        const { exchanges } = data.data;
        this.exchangeHistory = exchanges;
      },
      (error) => {
        console.error('Error fetching exchange history:', error);
      }
    );
  }

  getStatusColor(status: string): string {
    return status === 'Accepted' ? 'green' : 'red';
  }
}
