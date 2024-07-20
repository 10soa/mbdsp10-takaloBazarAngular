import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangesService } from 'src/app/services/exchange.service';
import { USERID} from 'src/app/constants/app.constants';

@Component({
  selector: 'app-exchange-in-progress',
  templateUrl: './exchange-in-progress.component.html',
  styleUrls: ['./exchange-in-progress.component.scss']
})
export class ExchangeInProgressComponent implements OnInit {
  myExchange: any[] = [];
  loading: boolean = true;
  userId = localStorage.getItem(USERID);

  constructor(
    private exchangesService: ExchangesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExchangeHistory();
  }

  getExchangeHistory(): void {
    this.exchangesService.myCurrentExchange().subscribe(
      (data: any) => {
        console.log('Exchange History:', data);
        this.myExchange = data.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching exchange history:', error);
        // this.loading = false;
      }
    );
  }
}
