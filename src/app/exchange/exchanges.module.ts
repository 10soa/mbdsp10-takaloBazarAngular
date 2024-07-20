import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { ExchangeRoutingModule } from './exchanges-routing.module';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';
import { ExchangeInProgressComponent } from './exchange-in-progress/exchange-in-progress.component';


@NgModule({
  declarations: [
    ExchangeHistoryComponent,
    ExchangeInProgressComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,

  ],
})
export class ExchangesModule { }
