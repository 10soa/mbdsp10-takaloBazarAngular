import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './myaccount/account.component';

const routes: Routes = [
  {
    path: 'me',
    component: AccountComponent,
    title: 'Mon Profil',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AccountRoutingModule {}
