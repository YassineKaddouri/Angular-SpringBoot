import { User } from 'src/app/ngrx/app-state/models/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { AuthPageActions } from 'src/app/ngrx/app-state/actions/auth';
import { AuthService } from 'src/app/ngrx/app-state/services/auth/auth.service';
import { FormGroup } from '@angular/forms';
import { SignupRequest } from 'src/app/ngrx/app-state/models/signup-request.model';
import { UserService } from 'src/app/ngrx/user/services/user.service';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss']
})

export class ModifierProfileComponent implements OnInit {
  imageFile: File;
  signupForm: FormGroup;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private user: AuthService,
    private toastr: ToastrService, private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(typeof({...this.data}))
  }

  onSubmit(){  
    let signupRequest: SignupRequest = this.data;
   signupRequest.imageFile = this.imageFile;
   console.log(signupRequest);
   
    this.userService.updatePatient(signupRequest).subscribe(
      data =>{
        console.log(data)
        this.showToaster();
         this.store.dispatch(AuthPageActions.login({loginRequest: {password: this.user.password,
        username: this.user.username} }));
        this.dialog.closeAll();
        console.log(AuthPageActions)
      },
      err=>{
        this.showerror();
      }
    )
  }

  onChange(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.data.image = e.target.result;
          this.imageFile = fileInput.target.files[0];
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onNoClick():void {
    this.dialog.closeAll();
  }

  showToaster(){
    this.toastr.success("le user bien modifier")

  }

  showerror(){
    this.toastr.error("err");
  }
}
