import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Object } from 'src/app/models/object.model';
import { ObjectsRoutingModule } from '../objects-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-object-card-expanded',
  templateUrl: './object-card-expanded.component.html',
  styleUrls: ['./object-card-expanded.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObjectsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
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
