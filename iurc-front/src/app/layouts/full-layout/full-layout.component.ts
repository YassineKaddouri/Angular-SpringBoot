import { getDirection } from './../../ngrx/app-state/selectors/app.selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../ngrx/app-state/models/user.model';
import * as _ from 'lodash';
import { AuthPageActions } from '../../ngrx/app-state/actions/auth';
import { getUser, getNavigation } from '../../ngrx/app-state/selectors/app.selectors';
import { Direction } from '@angular/cdk/bidi';
import { filter, tap } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';
import { NavigationRegisteringService } from 'src/app/navigation-registering.service';



import { NavigationEnd, Router } from '@angular/router';
import { map } from 'lodash';
import { NavItem } from 'src/app/ngrx/app-state/models/nav-item.model';

@Component({
  selector: 'sk-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {

  user$ : Observable<User>;

   navItems: NavItem[];
   
  dir$ : Observable<Direction>;
  url: string;

  isIdle: boolean = false;

  constructor(private store: Store, private userIdle: UserIdleService,  private router: Router,private navigationRegisteringService: NavigationRegisteringService
  ) {
    // this.user$ = this.store.select(getUser);
    this.user$ = this.store.select(getUser);
  }

  ngOnInit(): void {

     this.user$ = this.store.select(getUser);

    this.dir$ = this.store.select(getDirection);
    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.isIdle = !this.isIdle;
    });

     this.store.select(getNavigation).subscribe(
      navigation => this.navItems = _.cloneDeep(navigation)
    );
    this.url = this.router.url;
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    ).subscribe(
      event => {
        this.url = event.url;
      }
    )

     this.navigationRegisteringService.refresh();
  }

  logout() {
    this.store.dispatch(AuthPageActions.logout());
  }

  

  toggleIdle() {
    this.isIdle = !this.isIdle;
    this.userIdle.resetTimer();
  }

}
