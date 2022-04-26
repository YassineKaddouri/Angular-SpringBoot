import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { SITE_NAVIGATION } from './site.navigation';


@Injectable({
  providedIn: 'root'
})

export class SiteNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: SITE_NAVIGATION }))
  }
  

  refresh() {
    
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: SITE_NAVIGATION  }))
  }
}