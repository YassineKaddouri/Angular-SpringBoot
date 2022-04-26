import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { StoreModule } from '@ngrx/store';

import { ReservationRoutingModule } from './reservation-routing.module';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntlFrensh } from 'src/app/shared/MatPaginatorIntlFrensh';


@NgModule({
  declarations: [
    CreateReservationComponent,
    UpdateReservationComponent,
    ReservationListComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,

    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    TextFieldModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    StoreModule
  ],
  providers: [
       
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlFrensh,
    },
  ],
})
export class ReservationModule { }
