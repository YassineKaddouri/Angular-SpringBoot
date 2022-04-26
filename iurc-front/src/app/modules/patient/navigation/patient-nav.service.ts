import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { PATIENT_NAVIGATION } from './patient.navigation';


@Injectable({
  providedIn: 'root'
})

export class PatientNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: PATIENT_NAVIGATION }))
  }
  

  refresh() {
    
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: PATIENT_NAVIGATION  }))
  }
}