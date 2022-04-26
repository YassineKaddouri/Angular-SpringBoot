import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/ngrx/app-state/models/user.model';
import { getRoles, getUser } from 'src/app/ngrx/app-state/selectors/app.selectors';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ : Observable<User>;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.user$ = this.store.select(getUser);
    //console.log(localStorage.getItem('roles'))
  }

}
