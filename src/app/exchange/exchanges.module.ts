import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ExchangeRoutingModule } from './exchanges-routing.module';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';


@NgModule({
  declarations: [
    ExchangeHistoryComponent
  ],
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ExchangesModule { }
