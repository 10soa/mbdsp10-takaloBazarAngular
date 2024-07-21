import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './myaccount/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';
import { ExchangeHistoryComponent } from '../exchange/exchange-history/exchange-history.component';
import { OtherAccountComponent } from './other-account/other-account.component';
import { ObjectCardComponent } from '../object/object-card/object-card.component';
import { ObjectCardExpandedComponent } from '../object/object-card-expanded/object-card-expanded.component';
@NgModule({
  declarations: [
    AccountComponent,
    OtherAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterLink,
    ExchangeHistoryComponent,
    ObjectCardComponent,
    ObjectCardExpandedComponent
  ],
})
export class AccountModule { }
