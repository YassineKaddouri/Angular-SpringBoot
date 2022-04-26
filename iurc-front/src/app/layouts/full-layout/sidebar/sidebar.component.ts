import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { NavItem } from '../../../ngrx/app-state/models/nav-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() navItems: NavItem[];
  @Input() url : string;
  isAdmin = false;
  constructor() { }
  
  ngOnInit(): void {
    if(localStorage.getItem('roles') === "Admin") {
      this.isAdmin = true;
    }
  }


}
