import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { Uf } from 'src/app/ngrx/uf/models/uf.models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-uf',
  templateUrl: './create-uf.component.html',
  styleUrls: ['./create-uf.component.scss']
})
export class CreateUfComponent implements OnInit {
uf : Uf;
  filiere : Filiere;
  filiers:Filiere[];
  ufForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private formBuilder : FormBuilder ,
     private ufService: UfService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<CreateUfComponent>,
     private notificationService: NotificationService,
     private toastr: ToastrService,
     private filiereService : FiliereService) { }

  ngOnInit(): void {
    this.getAllFilieres();
    this.ufForm = this.formBuilder.group({
      name : ['',Validators.required],
      filiere:[''],
    });
   // console.log(this.editData);
   if(this.editData){
     this.actionBtn = "Modifier"
     this.ufForm.controls['name'].setValue(this.editData.name);
   }

  }

  getAllFilieres(){
    this.filiereService.getFiliereList().subscribe({
      next:(res) => {
      this.filiers = res;
      }
      // ,
      // error:(err) =>{
      //   alert("Erreur lors de télécharger les données!!")
      // }
    })
  }
//Ajouter site


  // addSite(){
  //   //console.log(this.siteForm.value);
  //   // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
  //   if(!this.editData){
  //     if(this.ufForm.valid){
  //       this.ufService.createUf(this.ufForm.value).subscribe({
  //         next:(res) =>{
  //           this.notificationService.success('UF ajouter avec succès')
  //           this.ufForm.reset();
  //           this.dialogRef.close('enregistrer');
  //           window.location.reload();
  //         },
  //         error:()=>{
  //           alert("Erreur lors d'ajout de uf")
  //         }
  //       })
  //     }
  //   }else{
  //     this.updateSite();
  //   }
   
  // }
  addUF(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    if(!this.editData){
      if (this.ufForm.valid) {
        let uf = this.uf ? {
          ...this.uf,
          ...this.ufForm.value,
          filiere: {
            id: this.ufForm.get('filiere').value
          },
        
        } : {
          ...this.ufForm.value,
          filiere: {  
              id: this.ufForm.get('filiere').value
            }
  
        };
        this.ufService.createUf(uf).subscribe({
          next: (res) => {
            // this.notificationService.success('UF ajouter avec succèss');
            this.showToast();
            this.ufForm.reset();
            this.dialogRef.close('enregistrer');
        
          
          },
          error: () => {
            // alert("Erreur lors d'ajout de réservation")
            this.showError();
          }
        })
      }
    }else{
      this.updateUf();
    }
   
  }
   showToast(){
     this.toastr.success('UF ajouter avec succèss');
   }
   showError(){
    this.toastr.error("Erreur lors d'ajout de uf");
  }
  // Modifier site 
  updateUf(){
    this.ufService.updateUf(this.ufForm.value, this.editData.id).subscribe({
      next:(res) =>{
        this.notificationService.success("UF Modifié");
        this.ufForm.reset();
        this.dialogRef.close('modifier');
        window.location.reload();
      },
      error:()=>{
        alert("Erreur lors de modifier l'Uf")
      }

    })
    window.location.reload();
  }

// pour fermer Dialog 

  onNoClick(): void {
    this.dialogRef.close();
  }

}
