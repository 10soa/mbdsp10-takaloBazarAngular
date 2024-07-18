import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';

const routes: Routes = [
  {
    path: 'history',
    component: ExchangeHistoryComponent,
    title: 'Create Object',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExchangeRoutingModule {}
