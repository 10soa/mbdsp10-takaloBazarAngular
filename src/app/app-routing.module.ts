import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./acceuilFO/acceuilFO.module').then(m => m.AcceuilFOModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'object',
    loadChildren: () => import('./object/objects.module').then(m => m.ObjectsModule)
  },
  {
    path: 'exchange',
    loadChildren: () => import('./exchange/exchanges.module').then(m => m.ExchangesModule),
    canActivate: [AuthGuard]
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: false,
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
