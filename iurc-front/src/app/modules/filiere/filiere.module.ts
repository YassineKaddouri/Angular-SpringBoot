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
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { FiliereRoutingModule } from './filiere-routing.module';
import { CreateFiliereComponent } from './create-filiere/create-filiere.component';
import { FiliereListComponent } from './filiere-list/filiere-list.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MatPaginatorIntlFrensh } from 'src/app/shared/MatPaginatorIntlFrensh';
import { FilierToUfComponent } from './filier-to-uf/filier-to-uf.component';


@NgModule({
  declarations: [
    CreateFiliereComponent,
    FiliereListComponent,
    ConfirmDeleteComponent,
    FilierToUfComponent
  ],
  imports: [
    CommonModule,
    FiliereRoutingModule,

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
    FiliereRoutingModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
       
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlFrensh,
    },
  ],
})
export class FiliereModule { }
