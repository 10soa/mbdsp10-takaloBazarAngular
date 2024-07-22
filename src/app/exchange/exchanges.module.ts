import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { ExchangeRoutingModule } from './exchanges-routing.module';
import { ExchangeInProgressComponent } from './exchange-in-progress/exchange-in-progress.component';
import { ExchangeAddComponent } from './exchange-add/exchange-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserObjectsComponent } from './exchange-add/user-objects/user-objects.component';
import { ObjectCardExpandedComponent } from '../object/object-card-expanded/object-card-expanded.component';
import { ObjectCardComponent } from '../object/object-card/object-card.component';
import { ExchangeDetailComponent } from './exchange-detail/exchange-detail.component';
import { AddNoteComponent } from './exchange-detail/addNote/add-note.component';


@NgModule({
  declarations: [
    ExchangeInProgressComponent,
    ExchangeAddComponent,
    UserObjectsComponent,
    ExchangeDetailComponent,
    AddNoteComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    ObjectCardExpandedComponent,
    ObjectCardComponent
  ],
})
export class ExchangesModule { }
