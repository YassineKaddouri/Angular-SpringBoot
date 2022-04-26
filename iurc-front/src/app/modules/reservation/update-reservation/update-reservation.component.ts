import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { ReservationService } from 'src/app/ngrx/reservation/services/reservation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Observable } from 'rxjs';
import { Uf } from 'src/app/ngrx/uf/models/uf.models';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { Patient } from 'src/app/ngrx/reservation/models/patient.models';
import { Reservation } from 'src/app/ngrx/reservation/models/reservation.models';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss']
})
export class UpdateReservationComponent implements OnInit {

  reservationForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  ufs:Uf[];
  patients:Patient[];
  patient : Patient;
  uf : Uf;
  reservation :Reservation;
  constructor(private formBuilder : FormBuilder ,
     private reservationService: ReservationService, 
     private ufService: UfService, 
     @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<UpdateReservationComponent>, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllUfs();
    this.getAllPatients();
    this.reservationForm = this.formBuilder.group({
      dateDebut : ['',Validators.required],
      dateFin : ['',Validators.required],
      patient : ['',Validators.required],
      uf : ['',Validators.required],
    });
    this.reservationForm.controls['dateDebut'].setValue(this.editData.dateDebut);
    this.reservationForm.controls['dateFin'].setValue(this.editData.dateFin);
    this.reservationForm.controls['patient'].setValue(this.editData.patient.id);
    this.reservationForm.controls['uf'].setValue(this.editData.uf.id);
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

  getAllPatients(){
    this.reservationService.getPatientList().subscribe({
      next:(res) => {
        this.patients = res;
        console.log(res);
      },
      error:(err) =>{
        alert("Erreur lors de télécharger les données!!")
      }
    })
  }
}
