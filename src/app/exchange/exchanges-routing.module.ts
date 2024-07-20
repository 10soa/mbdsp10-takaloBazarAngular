import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeHistoryComponent } from './exchange-history/exchange-history.component';
import { ExchangeInProgressComponent } from './exchange-in-progress/exchange-in-progress.component';

const routes: Routes = [
  {
    path: 'history',
    component: ExchangeHistoryComponent,
    title: 'Create Object',
  },
  {
    path: 'in-progress',
    component: ExchangeInProgressComponent,
    title: 'Echange en cours',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ExchangeRoutingModule {}
