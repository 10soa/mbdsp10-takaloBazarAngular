import { Component,HostListener,Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';
import { ExchangesService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit{
  @Input () header_big = false;
  @Input () white_bg = false;
  @Input () transparent = false;


  public sticky: boolean = false;

  constructor(
    public cartService: CartService,
    public utilsService: UtilsService,
    public exchangesService: ExchangesService
  ) { }

  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  ngOnInit(): void {
    if(!this.exchangesService.getDataFetched()){
      console.log("haha");
      
      this.exchangesService.fetchCurrentExchange();
    }
  }
}
