import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';
@Component({
  selector: 'app-create-uf',
  templateUrl: './create-uf.component.html',
  styleUrls: ['./create-uf.component.scss']
})
export class CreateUfComponent implements OnInit {

  filieres:Filiere[];
  ufForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private formBuilder : FormBuilder ,
     private ufService: UfService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<CreateUfComponent>,
     private notificationService: NotificationService,private filiereService : FiliereService) { }

  ngOnInit(): void {
    this.getFiliers();
    this.ufForm = this.formBuilder.group({
      name : ['',Validators.required],
    });
   // console.log(this.editData);
   if(this.editData){
     this.actionBtn = "Modifier"
     this.ufForm.controls['name'].setValue(this.editData.name);
   }
  }

//Ajouter site


  addSite(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    if(!this.editData){
      if(this.ufForm.valid){
        this.ufService.createUf(this.ufForm.value).subscribe({
          next:(res) =>{
            this.notificationService.success('UF ajouter avec succès')
            this.ufForm.reset();
            this.dialogRef.close('enregistrer');
            window.location.reload();
          },
          error:()=>{
            alert("Erreur lors d'ajout de uf")
          }
        })
      }
    }else{
      this.updateSite();
    }
   
  }

  // Modifier site 
  updateSite(){
    this.ufService.updateUf(this.ufForm.value, this.editData.id).subscribe({
      next:(res) =>{
        this.notificationService.success("UF Modifié");
        this.ufForm.reset();
        this.dialogRef.close('modifier');
      },
      error:()=>{
        alert("Erreur lors de modifier l'Uf")
      }

    })
  }

// pour fermer Dialog 

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFiliers() {
    this.filiereService.getFiliereList().subscribe({
      next:(res) => {
        this.filieres = res;
        console.log(this.filieres )
      },
      error:(err) =>{
        throw err;
      }
    })

  }

}
