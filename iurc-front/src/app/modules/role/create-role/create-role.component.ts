import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/ngrx/role/models/role.models';
import { RoleService } from 'src/app/ngrx/role/services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
role: Role = new Role();
  roleForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private formBuilder : FormBuilder ,
     private roleService: RoleService, 
     private toastr: ToastrService,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<CreateRoleComponent>) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name : ['',Validators.required]

    });
   // console.log(this.editData);
   if(this.editData){
     this.actionBtn = "Modifier"
     this.roleForm.controls['name'].setValue(this.editData.name);
  
   }
  }
  addSite(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    if(!this.editData){
      if(this.roleForm.valid){
        this.roleService.createRole(this.roleForm.value).subscribe({
          next:(res) =>{
            console.log(res);
            // alert("Role ajouter avec succès");
            this.showToast();
            this.roleForm.reset();
            this.dialogRef.close('enregistrer');
          },
          error:()=>{
            alert("Erreur lors d'ajout de site")
          }
        })
      }
    }
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  showToast(){
    this.toastr.success("Role ajouter avec succès")


}
}