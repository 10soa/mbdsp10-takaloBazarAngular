import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectCreateComponent } from './object-create/object-create.component';

const routes: Routes = [
  {
    path: 'new',
    component: ObjectCreateComponent,
    title: 'Create Object',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ObjectsRoutingModule {}
