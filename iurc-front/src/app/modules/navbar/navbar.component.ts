import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/ngrx/app-state/models/user.model';
import { AuthService } from 'src/app/ngrx/app-state/services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()user : User ;
  @Output() logout : EventEmitter<void> = new EventEmitter();
  constructor(
    private userService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // isAuthentificated()
  // {
  //   return this.userService.login;
  // }
  emitLogout(){
    this.logout.emit();
  }
  OnDeconnexion() {
    this.router.navigateByUrl('/login');
    console.log("Deconnexion");
    this.userService.signup;

  }
}
