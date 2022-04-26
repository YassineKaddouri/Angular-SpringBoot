import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';

const routes: Routes = [
  {
    path: "add",
    component : CreateReservationComponent
},
{
    path: "list",
    component : ReservationListComponent
},
{
  path : "update",
  component : UpdateReservationComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
