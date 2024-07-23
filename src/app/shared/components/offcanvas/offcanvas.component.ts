import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { IMobileMenu } from '../../types/menu-d-t';
import { mobile_menus } from '../../data/menu-data';
import { SessionService } from 'src/app/services/session.service';
import { ExchangesService } from 'src/app/services/exchange.service';


@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss']
})


export class OffcanvasComponent {

  constructor(
    public utilsService: UtilsService,
    public sessionService: SessionService,
    public exchangesService: ExchangesService,
  ) { }

  mobile_menus: IMobileMenu[] = mobile_menus;

  activeMenu: string = "";

  handleOpenMenu(navTitle: string) {
    if (navTitle === this.activeMenu) {
      this.activeMenu = "";
    } else {
      this.activeMenu = navTitle;
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
