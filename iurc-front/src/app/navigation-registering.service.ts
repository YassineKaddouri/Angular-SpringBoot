import { Injectable } from '@angular/core';


import { Store } from '@ngrx/store';

import { SiteNavigationRegisteringService } from './modules/site/navigation/site-nav.service';
import { NavigationPageActions } from './ngrx/app-state/actions/navigation';
import { CheckpointsNavigationRegisteringService } from './test-nav.service';
import { TestNavigationRegisteringService } from './test1-nav.service';
import { PatientNavigationRegisteringService } from './modules/patient/navigation/patient-nav.service';
import { UFNavigationRegisteringService } from './modules/uf/navigation/uf-nav.service';
import { ReservationNavigationRegisteringService } from './modules/reservation/navigation/reservation-nav.service';
import { FiliereNavigationRegisteringService } from './modules/filiere/navigation/filiere-nav.service';
import { RoleNavigationRegisteringService } from './modules/role/navigation/role-nav.service';
//import { RoleNavigationRegisteringService } from './modules/Role/navigation/role-nav.service';
@Injectable({
  providedIn: 'root'
})
export class NavigationRegisteringService {

  constructor(
    

    private store: Store,
    private siteNavigationRegisteringService: SiteNavigationRegisteringService,
    private  patientNavigationRegisteringService: PatientNavigationRegisteringService,
    private  ufNavigationRegisteringService: UFNavigationRegisteringService,
    private  reservationNavigationRegisteringService: ReservationNavigationRegisteringService,
    private filiereNavigationRegisteringService: FiliereNavigationRegisteringService,
    private RoleNavigationRegisteringService: RoleNavigationRegisteringService,

  ) {
  }

  refresh() {
    
    this.store.dispatch(NavigationPageActions.clearNavigation());
    this.reservationNavigationRegisteringService.refresh();
    this.siteNavigationRegisteringService.refresh();
    this.filiereNavigationRegisteringService.refresh();
    this.ufNavigationRegisteringService.refresh();
    this.patientNavigationRegisteringService.refresh();
    this.RoleNavigationRegisteringService.refresh();
    
    
  }
}
