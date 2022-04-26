import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AuthGuard } from './shared/guard/auth/auth.guard';
import { ReverseAuthGuard } from './shared/guard/auth/reverse-auth.guard';

const routes: Routes = [

  {
    path: "",
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'signup',
        component: SignupComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'site',
        loadChildren:() => import('./modules/site/site.module').then(m=>m.SiteModule)
      },
      {
        path: 'uf',
        loadChildren:() => import('./modules/uf/uf.module').then(m=>m.UfModule)
      },
      {
        path: 'reservation',
        loadChildren:() => import('./modules/reservation/reservation.module').then(m=>m.ReservationModule)
      },
      {
      path: 'patient',
      loadChildren:() => import('./modules/patient/patient.module').then(m=>m.PatientModule) 
      
    },
    {
      path: 'filiere',
      loadChildren:() => import('./modules/filiere/filiere.module').then(m=>m.FiliereModule)
    },
    {
      path: 'role',
      loadChildren:() => import('./modules/role/role.module').then(m=>m.RoleModule)
    },
    {
      path:'patient-details/:id',
      loadChildren:() => import('./modules/patient/patient.module').then(m=>m.PatientModule)
    },
    {
      path:'update-patient/:id',
      loadChildren:() => import('./modules/patient/patient.module').then(m=>m.PatientModule)
    }
    ]
       },
    {
     
    path: "",
    component: BlankLayoutComponent,
    canActivate: [ReverseAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path:'signup',
        component: SignupComponent
      },
      {
        path:'**',
        redirectTo: 'login',
      }

    ]
  },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
