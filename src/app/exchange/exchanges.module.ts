import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { ExchangeRoutingModule } from './exchanges-routing.module';
import { ExchangeInProgressComponent } from './exchange-in-progress/exchange-in-progress.component';
import { ExchangeDetailComponent } from './exchange-detail/exchange-detail.component';


@NgModule({
  declarations: [
    ExchangeInProgressComponent,
    ExchangeDetailComponent
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
