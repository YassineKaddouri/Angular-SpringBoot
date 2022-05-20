import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../../ngrx/app-state/actions/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide: boolean = true;

  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private store : Store) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(
        "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
      )]],   

    });
  }
  
  submitted = false;
 
  ngOnInit(): void {
    
  }

  get f() { return this.signupForm.controls; }

   signup() {
     console.log(this.signupForm.value);
    if (this.signupForm.valid) {
     this.store.dispatch(AuthPageActions.signup({ signupRequest: this.signupForm.value }));
     }
  }

}
