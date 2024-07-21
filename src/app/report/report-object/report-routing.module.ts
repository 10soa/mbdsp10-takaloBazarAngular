import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportObjectComponent } from './report-object/report-object.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportObjectComponent,
    title: 'Signaler un Objet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
