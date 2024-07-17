import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ObjectCreateComponent } from './object-create/object-create.component';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { ObjectCardComponent } from './object-card/object-card.component';
import { ObjectCardExpandedComponent } from './object-card-expanded/object-card-expanded.component';



@NgModule({
  declarations: [
    ObjectCreateComponent,
    ObjectSearchComponent,
    ObjectCardComponent,
    ObjectCardExpandedComponent
  ],
  imports: [
    CommonModule,
    ObjectsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ObjectsModule { }
