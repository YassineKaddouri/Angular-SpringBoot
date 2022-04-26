import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { CHECKPOINTS_NAVIGATION } from './test.navigation';
import { TEST_NAVIGATION } from './test1.navigation';

@Injectable({
  providedIn: 'root'
})

export class TestNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: TEST_NAVIGATION }))
  }
  

  refresh() {
    
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: TEST_NAVIGATION  }))
  }
}