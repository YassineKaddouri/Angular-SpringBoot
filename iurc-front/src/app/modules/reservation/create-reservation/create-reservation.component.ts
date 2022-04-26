import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ReservationService } from 'src/app/ngrx/reservation/services/reservation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs';
import { Uf } from 'src/app/ngrx/uf/models/uf.models';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { Patient } from 'src/app/ngrx/reservation/models/patient.models';
import { Reservation } from 'src/app/ngrx/reservation/models/reservation.models';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { CreatePatientComponent } from '../../patient/create-patient/create-patient.component';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';

import { FiliereListComponent } from '../../filiere/filiere-list/filiere-list.component';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss']
})
export class CreateReservationComponent implements OnInit {
  reservationForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  ufs:Uf[];
  patients:Patient[];
  patient : Patient;
  uf : Uf;
  filiere : Filiere;
  filieres :[];
  reservation = new Reservation();
  addedPatient: MatDialogRef<CreatePatientComponent>;
  // getFiliere: MatDialogRef<FiliereListComponent>;
  selectedPatient;
  constructor(private formBuilder : FormBuilder ,
     private reservationService: ReservationService, 
     private ufService: UfService, 
     private dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<CreateReservationComponent>, private notificationService: NotificationService,
     private filiereService : FiliereService) { }

  ngOnInit(): void {
   this.getFiliers()
    this.getAllUfs();
    this.getAllPatients();
    this.reservationForm = this.formBuilder.group({
      dateDebut : ['',Validators.required],
      dateFin : ['',Validators.required],
      patient : ['',Validators.required],
      filier : ['',Validators.required],
      uf : ['',Validators.required],
    });
   
  }
  
  //  reservation = {
  //   dateDebut: this.reservationForm.value.dateDebut,
  //   dateFin: this.reservationForm.value.dateFin,
  //   description: this.reservationForm.value.dateDebut,
  // };

  addReservation(){
    //console.log(this.siteForm.value);
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    if(!this.editData){
      if(this.reservationForm.valid){
        let reservation = this.reservation ? { ...this.reservation,
         ...this.reservationForm.value,
            patient:{
              id:this.reservationForm.get('patient').value
            },
            uf:{
              id:this.reservationForm.get('uf').value
            },

          
         
          

      
        } : {
          ...this.reservationForm.value,
           patient:{
              id:this.reservationForm.get('patient').value
            },
            uf:{
              id:this.reservationForm.get('uf').value
            },
          

        };

   
        this.reservationService.createReservation(reservation).subscribe({
          next:(res) =>{
            this.notificationService.success('Reservation ajouter avec succès');
            this.reservationForm.reset();
            this.dialogRef.close('enregistrer');
          },
          error:()=>{
            alert("Erreur lors d'ajout de reservation")
          }
        })
      }
    }else{
      this.updateReservation();
    }
   
  }

  updateReservation(){
    let reservation = this.reservation ? { ...this.reservation,
      ...this.reservationForm.value,
         patient:{
           id:this.reservationForm.get('patient').value
         },
         uf:{
           id:this.reservationForm.get('uf').value
         }

     
     } : {
       ...this.reservationForm.value,
        patient:{
           id:this.reservationForm.get('patient').value
         },
         uf:{
           id:this.reservationForm.get('uf').value
         }

     };
    this.reservationService.updateReservation(reservation, this.editData.id).subscribe({
      next:(res) =>{
        this.notificationService.success("Reservation Modifié");
        this.reservationForm.reset();
        this.dialogRef.close('modifier');
      },
      error:()=>{
        alert("Erreur lors de modifier la reservation")
      }

    })
  }

// pour fermer Dialog 

  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllUfs(){
    this.ufService.getUFList().subscribe({
      next:(res) => {
        this.ufs = res;
        console.log(res);
      },
      error:(err) =>{
        alert("Erreur lors de télécharger les données!!")
      }
    })
  }

  getAllPatients(call?){
    this.reservationService.getPatientList().subscribe({
      next:(res) => {
        this.patients = res;
        if(call) {
          this.selectedPatient = this.patients[this.patients.length-1].id;
          console.log(this.patients.length-1)
        }

      },
      error:(err) =>{
        alert("Erreur lors de télécharger les données!!")
      }
    })
  }
  openDialogg(){

    this.addedPatient = this.dialog.open(CreatePatientComponent, {
      //panelClass: 'my-dialog-class-css'
     // width: '30%'
    });

    this.addedPatient.afterClosed().subscribe(async res => {
      if(res)
        this.getAllPatients(true);
    })
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
  onFilierSelected(){
this.ufService.getUfFiliere(this.reservationForm.get('filier').value).subscribe({
next:(res) =>{
  this.ufs= res;
  console.log(this.ufs)
},
error:(err) =>{
  throw err;
}

    })
  }

}