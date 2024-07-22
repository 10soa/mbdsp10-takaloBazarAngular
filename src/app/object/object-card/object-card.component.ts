import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Object } from 'src/app/models/object.model';
import { ObjectsRoutingModule } from '../objects-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ObjectsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ObjectCardComponent {
  @Input() object!: Object;
}
