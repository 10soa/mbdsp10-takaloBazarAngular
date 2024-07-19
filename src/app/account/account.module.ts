import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './myaccount/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';
import { ExchangeHistoryComponent } from '../exchange/exchange-history/exchange-history.component';
@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterLink,
    ExchangeHistoryComponent,
  ],
})
export class AccountModule { }
