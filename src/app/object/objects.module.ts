import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ObjectCreateComponent } from './object-create/object-create.component';
import { ObjectsRoutingModule } from './objects-routing.module';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { ObjectCardComponent } from './object-card/object-card.component';
import { ObjectCardExpandedComponent } from './object-card-expanded/object-card-expanded.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';
import { ObjectUpdateComponent } from './object-update/object-update.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportObjectComponent } from '../report/report-object/report-object/report-object.component';
import { MyObjectsComponent } from './my-objects/my-objects.component';



@NgModule({
  declarations: [
    ObjectCreateComponent,
    ObjectSearchComponent,
    ObjectDetailComponent,
    ObjectUpdateComponent,
    ReportObjectComponent,
    MyObjectsComponent
  ],
  imports: [
    CommonModule,
    ObjectsRoutingModule,
    SharedModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    ObjectCardExpandedComponent,
    ObjectCardComponent
  ],
})
export class ObjectsModule { }
