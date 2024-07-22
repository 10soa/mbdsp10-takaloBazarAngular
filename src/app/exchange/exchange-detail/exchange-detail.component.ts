import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangesService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-exchange-detail',
  templateUrl: './exchange-detail.component.html',
  styleUrls: ['./exchange-detail.component.scss']
})
export class ExchangeDetailComponent implements OnInit {
  exchange: any;
  loading: boolean = true;
  closed: boolean = false;
  propositionObjects: any[] = [];
  receiverObjects: any[] = [];
  lastActionDate?: Date;

  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exchangeId = params['id'];
      this.fetchExchangeDetails(exchangeId);
    });
  }

  fetchExchangeDetails(exchangeId: string): void {
    this.exchangesService.getExchangeById(exchangeId).subscribe((data: any) => {
      console.log('Exchange', data);
      this.exchange = data;
      this.closed = this.exchange.status !== 'Proposed';
      this.divideExchangeObjects();
      this.lastActionDate = this.exchange.date || this.exchange.created_at;
      this.loading = false;
    }, error => {
      console.error('Error fetching exchange details:', error);
      this.loading = false;
    });
  }

  divideExchangeObjects(): void {
    this.propositionObjects = this.exchange.exchange_objects.filter((obj: any) => obj.user_id === this.exchange.proposer_user_id);
    this.receiverObjects = this.exchange.exchange_objects.filter((obj: any) => obj.user_id === this.exchange.receiver_user_id);
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'Proposed':
        return 'Proposé';
      case 'Accepted':
        return 'Accepté';
      case 'Refused':
        return 'Refusé';
      default:
        return status;
    }
  }

}
