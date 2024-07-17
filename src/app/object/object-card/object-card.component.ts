import { Component, Input } from '@angular/core';
import { Object } from 'src/app/models/object.model';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss']
})
export class ObjectCardComponent {
  @Input() object!: Object;

  addToWishlist(object: Object) {

  }
  addToCart(object: Object) {

  }
  isItemInCart(object: Object) {

  }
  isItemInWishlist(object: Object) {

  }
  addToCompare(object: Object) {

  }
  isItemInCompare(object: Object) {

  }

}
