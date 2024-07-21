import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './myaccount/account.component';
import { OtherAccountComponent } from './other-account/other-account.component';

const routes: Routes = [
  {
    path: 'me',
    component: AccountComponent,
    title: 'Mon Profil',
  },
  {
    path: ':id',
    component: OtherAccountComponent,
    title: 'Autre Profil',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AccountRoutingModule {}
