import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
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
import { AcceptExchangeComponent } from './exchange-detail/accept-exchange/accept-exchange.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ExchangeInProgressComponent,
    ExchangeAddComponent,
    UserObjectsComponent,
    ExchangeDetailComponent,
    AddNoteComponent,
    AcceptExchangeComponent
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
    ObjectCardComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class ExchangesModule { }
