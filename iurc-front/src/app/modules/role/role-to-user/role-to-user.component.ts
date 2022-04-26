import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/ngrx/app-state/models/user.model';
import { AuthService } from 'src/app/ngrx/app-state/services/auth/auth.service';
import { Role } from 'src/app/ngrx/role/models/role.models';
import { RoleService } from 'src/app/ngrx/role/services/role.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';

@Component({
  selector: 'app-role-to-user',
  templateUrl: './role-to-user.component.html',
  styleUrls: ['./role-to-user.component.scss']
})
export class RoleToUserComponent implements OnInit {

  roleUserForm !: FormGroup;
  users: any;
  //site: Site[];
  //filiers :Filiere;
  //filiere :Filiere[] ;
  @Input() user: User[];
  @Input() role: Role[] = []

  //private filiereList: FiliereListComponent;

  constructor(private formBuilder: FormBuilder, private roleService: RoleService,
    private userService: AuthService, private notificationService: NotificationService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getRole();
    this.getUser();

  }

  createForm() {
    this.roleUserForm = this.formBuilder.group({
      user: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
    });

  }



  public getRole(): void {
    this.roleService.getRoleList().subscribe(
      (response: Role[]) => {
        this.role = response;
        //console.log(this.filiere);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  public getUser(): void {

    this.userService.getUserList().subscribe(
    (response: User[]) => {
        this.user = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }


    );
  }
  submit() {
    if (this.roleUserForm.valid) {
      let role = {
        username: this.roleUserForm.get('user').value,
        roleName: this.roleUserForm.get('role').value,
      }
      console.log(role);
      this.userService.createRoleUser(role).subscribe({
        next: (res) => {
          //alert("SUCCESS");
          console.log(res);
          this.notificationService.success('Enregistrement réussi!')
          //this.siteFilForm.reset();
          window.location.reload();
        },
        error: () => {
          alert("ERROR!!!")
        }
      })
    };

  }

}
