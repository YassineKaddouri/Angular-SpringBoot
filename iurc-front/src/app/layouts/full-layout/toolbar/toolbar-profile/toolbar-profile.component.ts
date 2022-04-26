import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../../ngrx/app-state/models/user.model';

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrls: ['./toolbar-profile.component.scss']
})
export class ToolbarProfileComponent implements OnInit {

  @Input()user : User ;
  @Output() logout : EventEmitter<void> = new EventEmitter();
  
  constructor(
  ) { 

  }

  ngOnInit() {
      console.log(this.user.roles);
  }

  emitLogout(){
    this.logout.emit();
  }

}
