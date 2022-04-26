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

import { RoleRoutingModule } from './role-routing.module';


import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntlFrensh } from 'src/app/shared/MatPaginatorIntlFrensh';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleToUserComponent } from './role-to-user/role-to-user.component';




//import { MatDialogRef } from '@angular/material/dialog'
@NgModule({
  declarations: [

  
  
            CreateRoleComponent,
             RoleToUserComponent,
             RoleToUserComponent
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
    RoleRoutingModule,
    MatDatepickerModule,
    MatSelectModule

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
export class RoleModule { }
