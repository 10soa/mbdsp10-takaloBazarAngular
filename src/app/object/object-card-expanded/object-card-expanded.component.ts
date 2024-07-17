import { Component, Input } from '@angular/core';
import { Object } from 'src/app/models/object.model';

@Component({
  selector: 'app-object-card-expanded',
  templateUrl: './object-card-expanded.component.html',
  styleUrls: ['./object-card-expanded.component.scss']
})
export class ObjectCardExpandedComponent {
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
