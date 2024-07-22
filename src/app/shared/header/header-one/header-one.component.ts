import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';
import { ExchangesService } from 'src/app/services/exchange.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  @Input() header_big = false;
  @Input() white_bg = false;
  @Input() transparent = false;


  public sticky: boolean = false;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
    public exchangesService: ExchangesService,
    public sessionService: SessionService,
  ) { }

  user: User | null = null;

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    if (this.sessionService.isConnected()) {
      if (!this.exchangesService.getDataFetched()) {
        this.exchangesService.fetchCurrentExchange();
      }
      if (!this.sessionService.userFetched) {
        this.sessionService.getUserInfo();
      }
    }
  }
}
