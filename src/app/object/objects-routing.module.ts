import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectCreateComponent } from './object-create/object-create.component';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { ObjectDetailComponent } from './object-detail/object-detail.component';

const routes: Routes = [
  {
    path: 'new',
    component: ObjectCreateComponent,
    title: 'Create Object',
  },
  {
    path: 'search',
    component: ObjectSearchComponent,
    title: 'Search Object',
  },
  {
    path: ':id',
    component: ObjectDetailComponent,
    title: 'Object Details',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ObjectsRoutingModule {}
