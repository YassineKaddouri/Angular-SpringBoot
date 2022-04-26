import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoleComponent } from './create-role/create-role.component';
import { ListRoleComponent } from './list-role/list-role.component';
import { RoleToUserComponent } from './role-to-user/role-to-user.component';









const routes: Routes = [
  {
        path: "add",
        component : CreateRoleComponent
},
    {
        path: "list",
        component : ListRoleComponent
    },
    {
        
        path: "addRoleToUser",
        component : RoleToUserComponent
        
  }







    

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
