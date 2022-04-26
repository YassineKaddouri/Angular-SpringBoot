import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/ngrx/app-state/models/user.model';
import { getUser } from 'src/app/ngrx/app-state/selectors/app.selectors';
import { ModifierProfileComponent } from '../modifier-profile/modifier-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  
  @Input()user:User;

  constructor( private dialog:  MatDialog, private http: HttpClient, private store: Store) { }

  ngOnInit(): void {
    console.log(this.store.select(getUser))
  }


  open() {
    this.dialog.open(ModifierProfileComponent, {
      data : {...this.user},
      width: '30%',
    })
  }
}
