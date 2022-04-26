import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthPageActions } from 'src/app/ngrx/app-state/actions/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  



  constructor(private fb: FormBuilder, private store: Store, public dialog: MatDialog, private router:Router) {
    

    this.buildForm();

  }

  ngOnInit(): void {
 
  }

    buildForm() {

    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    
  }

   login() {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthPageActions.login({ loginRequest: this.loginForm.value }));
    }
  }
  signup(){
    this.router.navigateByUrl('/signup');
  }

  parseLoginError(errorMessage: any) {
    return `LOGIN.ERRORS.${errorMessage}`;
  }
}
