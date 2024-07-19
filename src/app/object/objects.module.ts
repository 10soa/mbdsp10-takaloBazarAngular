import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ObjectCreateComponent } from './object-create/object-create.component';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectUpdateComponent } from './object-update/object-update.component';



@NgModule({
  declarations: [
    ObjectCreateComponent,
    ObjectUpdateComponent
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
