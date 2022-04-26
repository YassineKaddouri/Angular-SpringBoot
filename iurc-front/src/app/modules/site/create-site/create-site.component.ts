import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { SiteService } from 'src/app/ngrx/site/services/site.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.scss']
})
export class CreateSiteComponent implements OnInit {

  siteForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  constructor(private formBuilder : FormBuilder ,
     private siteService: SiteService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<CreateSiteComponent>) { }

  ngOnInit(): void {
    this.siteForm = this.formBuilder.group({
      name : ['',Validators.required],
      address : ['',Validators.required]
    });
   // console.log(this.editData);
   if(this.editData){
     this.actionBtn = "Modifier"
     this.siteForm.controls['name'].setValue(this.editData.name);
     this.siteForm.controls['address'].setValue(this.editData.address);
   }
  }

   
 
  
//Ajouter site


  addSite(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    if(!this.editData){
      if(this.siteForm.valid){
        this.siteService.createSite(this.siteForm.value).subscribe({
          next:(res) =>{
            alert("Site ajouter avec succès");
            this.siteForm.reset();
            this.dialogRef.close('enregistrer');
          },
          error:()=>{
            alert("Erreur lors d'ajout de site")
          }
        })
      }
    }else{
      this.updateSite();
    }
   
  }

  // Modifier site 
  updateSite(){
    this.siteService.updateSite(this.siteForm.value, this.editData.id).subscribe({
      next:(res) =>{
        alert("Site Modifié");
        this.siteForm.reset();
        this.dialogRef.close('modifier');
      },
      error:()=>{
        alert("Erreur lors de modifier le site")
      }

    })
  }

// pour fermer Dialog 

  onNoClick(): void {
    this.dialogRef.close();
  }


}
