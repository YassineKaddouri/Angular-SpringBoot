import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationPageActions } from 'src/app/ngrx/app-state/actions/navigation';
import { CHECKPOINTS_NAVIGATION } from './test.navigation';

@Injectable({
  providedIn: 'root'
})
export class CheckpointsNavigationRegisteringService {

  constructor(private store: Store) {
      this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: CHECKPOINTS_NAVIGATION }))
  }
  

  refresh() {
    
    this.store.dispatch(NavigationPageActions.registerNavigation({ navItems: CHECKPOINTS_NAVIGATION  }))
  }
}