import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';

@Component({
  selector: 'app-create-filiere',
  templateUrl: './create-filiere.component.html',
  styleUrls: ['./create-filiere.component.scss']
})
export class CreateFiliereComponent implements OnInit {
  filiereForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private filiereService: FiliereService,
    private dialogRef: MatDialogRef<CreateFiliereComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private formBuilder : FormBuilder,
    private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.filiereForm = this.formBuilder.group({
      name : ['',Validators.required]
     
    });
    if(this.editData){
      this.actionBtn = "Modifier"
      this.filiereForm.controls['name'].setValue(this.editData.name);
      
    }
  }
  addFiliere(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
   
    if(!this.editData){
      if(this.filiereForm.valid){
        this.filiereService.createFiliere(this.filiereForm.value).subscribe({
          next:(res) =>{
            this.notificationService.success('Filière ajouter avec succès')
            //alert("Site ajouter avec succès");
            this.filiereForm.reset();
            this.dialogRef.close('enregistrer');
          },
          error:()=>{
            alert("Erreur lors d'ajout de site")
          }
        })
      }
    }else{
      this.updateFiliere();

    }
      //window.location.reload();
   
   
  }

    // Modifier Filière
    updateFiliere(){
      this.filiereService.updateFiliere(this.filiereForm.value, this.editData.id).subscribe({
        next:(res) =>{
          //alert("Site Modifié");
          this.notificationService.success('Filière modifier!')
          this.filiereForm.reset();
          this.dialogRef.close('modifier');
        },
        error:()=>{
          this.notificationService.warn('Erreur lors de modication!')
        }
  
      })
    }

  // pour fermer Dialog 

  onNoClick(): void {
    this.dialogRef.close();
  }


}
