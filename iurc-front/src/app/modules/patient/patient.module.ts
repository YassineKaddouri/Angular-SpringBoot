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
import {MatDatepickerModule} from '@angular/material/datepicker'
import { StoreModule } from '@ngrx/store';

import { PatientRoutingModule } from './patient-routing.module';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { DetailPatientComponent } from './detail-patient/detail-patient.component';
import { MatPaginatorIntlFrensh } from 'src/app/shared/MatPaginatorIntlFrensh';


//import { MatDialogRef } from '@angular/material/dialog'
@NgModule({
  declarations: [
  
  
    CreatePatientComponent,
            UpdatePatientComponent,
            DetailPatientComponent
  ],
  imports: [
    CommonModule,
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
    StoreModule,
    PatientRoutingModule,
    MatDatepickerModule,
  

    //FormBuilder,
//FormGroup,
   // Validators,
    //MatDialogRef
  
   
  ],
  providers: [
       
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlFrensh,
    },
  ],
})
export class PatientModule { }
