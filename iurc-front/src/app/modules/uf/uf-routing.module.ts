import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUfComponent } from './create-uf/create-uf.component';
import { UfListComponent } from './uf-list/uf-list.component';

const routes: Routes = [
  {
    path: "add",
    component : CreateUfComponent
},
{
    path: "list",
    component : UfListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UfRoutingModule { }
