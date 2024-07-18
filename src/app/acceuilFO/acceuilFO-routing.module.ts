import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeFOComponent } from './home/homeFO.component';


const routes: Routes = [
  {
    path:'',
    component: HomeFOComponent,
    title:'Page d\'Acceuil',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceuilFORoutingModule { }
