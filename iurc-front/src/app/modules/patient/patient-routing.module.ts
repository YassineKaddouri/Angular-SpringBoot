import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListPatientComponent} from '../patient/list-patient/list-patient.component'
import { CreatePatientComponent } from './create-patient/create-patient.component';



const routes: Routes = [

  {
    path: "add",
    component : CreatePatientComponent
},
    {
        path: "list",
        component : ListPatientComponent
    }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
