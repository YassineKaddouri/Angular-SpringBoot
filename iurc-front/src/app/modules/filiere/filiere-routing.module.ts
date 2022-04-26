import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFiliereComponent } from './create-filiere/create-filiere.component';
import { FiliereListComponent } from './filiere-list/filiere-list.component';

const routes: Routes = [
  {
    path: "add",
    component : CreateFiliereComponent
},
{
    path: "list",
    component : FiliereListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiliereRoutingModule { }
