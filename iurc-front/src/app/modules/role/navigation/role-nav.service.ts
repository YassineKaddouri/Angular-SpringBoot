import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { ROLE_NAVIGATION } from "./role.navigation";



@Injectable({
  providedIn: 'root'
})

export class RoleNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems:  ROLE_NAVIGATION }))
  }
  

  refresh() {
    
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems:  ROLE_NAVIGATION  }))
  }
}