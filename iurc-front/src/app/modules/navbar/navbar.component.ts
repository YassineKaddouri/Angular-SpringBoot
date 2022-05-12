import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/ngrx/app-state/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

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
  // OnDeconnexion() {
  //   console.log("Deconnexion");
  //   this.userService.signup;
  //   this.router.navigateByUrl('/index');

  // }
}
