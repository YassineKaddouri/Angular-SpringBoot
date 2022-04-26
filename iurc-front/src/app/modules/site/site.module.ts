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

import { StoreModule } from '@ngrx/store';

import { SiteRoutingModule } from './site-routing.module';
import { CreateSiteComponent } from './create-site/create-site.component';
import { SiteListComponent } from './site-list/site-list.component';
import { FiliereToSiteComponent } from './filiere-to-site/filiere-to-site.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntlFrensh } from 'src/app/shared/MatPaginatorIntlFrensh';


@NgModule({
  declarations: [
      CreateSiteComponent,
      SiteListComponent,
      FiliereToSiteComponent,
    
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
    SiteRoutingModule,
    MatSelectModule,
    MatDialogModule,
    SiteRoutingModule,

  ],
  providers: [
       
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlFrensh,
    },
  ],
})
export class SiteModule { }
