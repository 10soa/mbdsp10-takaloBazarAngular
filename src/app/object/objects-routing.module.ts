import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectCreateComponent } from './object-create/object-create.component';
import { ObjectSearchComponent } from './object-search/object-search.component';
import { ObjectUpdateComponent } from './object-update/object-update.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'new',
    component: ObjectCreateComponent,
    title: 'Create Object',
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: ObjectSearchComponent,
    title: 'Search Object',
  },{
    path: 'update/:objectId',
    component: ObjectUpdateComponent,
    title: 'Modifier objet', 
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ObjectsRoutingModule {}
