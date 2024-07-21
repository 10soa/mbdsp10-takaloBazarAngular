import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilFORoutingModule } from './acceuilFO-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeFOComponent } from './home/homeFO.component';
import { ShopModule } from '../shop/shop.module';
@NgModule({
  declarations: [
    HomeFOComponent
  ],
  imports: [
    CommonModule,
    AcceuilFORoutingModule,
    SharedModule,
    ShopModule
  ]
})
export class AcceuilFOModule { }
