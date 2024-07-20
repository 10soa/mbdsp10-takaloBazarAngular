import { Component, Input } from '@angular/core';
import { USERID } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss']
})
export class MiniCartComponent {
  userId = localStorage.getItem(USERID);
  @Input() exchangeItems: any[] = [];
  constructor() { }
}
