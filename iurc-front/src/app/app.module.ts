import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { BidiModule } from '@angular/cdk/bidi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AppStateModule } from './ngrx/app-state/app-state.module';
import { ProfileModule } from './modules/profile/profile.module';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { ToolbarProfileComponent } from './layouts/full-layout/toolbar/toolbar-profile/toolbar-profile.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UserIdleModule } from 'angular-user-idle';
import { SignupComponent } from './authentication/signup/signup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { SidebarComponent } from './layouts/full-layout/sidebar/sidebar.component';
import { MenuItemComponent } from './layouts/full-layout/sidebar/menu-item/menu-item.component';

import { SiteModule } from './modules/site/site.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreateSiteComponent } from './modules/site/create-site/create-site.component';
import { ListPatientComponent } from './modules/patient/list-patient/list-patient.component';


import { ToastrModule } from 'ngx-toastr';
import { FiliereModule } from './modules/filiere/filiere.module';
import { ListRoleComponent } from './modules/role/list-role/list-role.component';
import { ModifierProfileComponent } from './modules/profile/profile/modifier-profile/modifier-profile.component';

import { HomeComponent } from './modules/home/home.component';
import {  NavbarComponent } from './modules/navbar/navbar.component';
import { ContactComponent } from './modules/contact/contact.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './modules/footer/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlankLayoutComponent,
    FullLayoutComponent,
    ToolbarProfileComponent,
    SignupComponent,
    SidebarComponent,
    MenuItemComponent,
    ListPatientComponent,
    ListRoleComponent,
    ModifierProfileComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    FooterComponent,
    ListRoleComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    AppStateModule,
    StoreModule,
    BidiModule,
    ProfileModule,
  
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,

    SiteModule,
    FiliereModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    /** */


    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // StoreDevtoolsModule.instrument({ maxAge: 25})
    // TranslateModule.forRoot(),
    UserIdleModule.forRoot({ idle: 1800, timeout: 1, ping: 10 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
