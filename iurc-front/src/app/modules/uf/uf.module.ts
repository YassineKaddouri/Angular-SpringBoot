import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StoreModule } from '@ngrx/store';

import { UfRoutingModule } from './uf-routing.module';
import { CreateUfComponent } from './create-uf/create-uf.component';
import { UfListComponent } from './uf-list/uf-list.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UfCalendarComponent } from './uf-calendar/uf-calendar.component';
//import { APP_DATE_FORMATS } from 'src/app/shared/format';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { UpdateUfComponent } from './update-uf/update-uf.component';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'MM/DD/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@NgModule({
  declarations: [
    CreateUfComponent,
    UfListComponent,
    ConfirmDeleteComponent,
    UfCalendarComponent,
    UpdateUfComponent
  ],
  imports: [
    CommonModule,
    UfRoutingModule,
    MatSelectModule,
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
    MatDialogModule,
    StoreModule,
    MatDatepickerModule,
  ],
  providers: [
    //{provide: DateAdapter, useClass: MyDateAdapter},
    //{provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    // { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }
    
   { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
   { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
   
   {
     provide: MAT_DATE_LOCALE, useValue: 'fr'
 },

],
})
export class UfModule { }
