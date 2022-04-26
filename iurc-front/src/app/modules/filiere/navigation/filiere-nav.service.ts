import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { FILIERE_NAVIGATION } from './filiere.navigation';


@Injectable({
  providedIn: 'root'
})

export class FiliereNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: FILIERE_NAVIGATION}))
  }
  

  refresh() {
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: FILIERE_NAVIGATION  }))
  }
}