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
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { DatePipe } from '@angular/common';
import { CreatePatientComponent } from '../../patient/create-patient/create-patient.component';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
  providers: [DatePipe]
})
export class CreateReservationComponent implements OnInit {
  reservationForm !: FormGroup;
  actionBtn : string = "Enregistrer"
  ufs:Uf[];
  patients:Patient[];
  patient : Patient;
  uf : Uf;
  filiers : [];
  reservation = new Reservation();
  filierSelected;
  selectedFilier;
  selectedUf;
  selectedPatient;
  addedPatient: MatDialogRef<CreatePatientComponent>;
  constructor(private formBuilder : FormBuilder ,
    private reservationService: ReservationService, 
    private ufService: UfService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<CreateReservationComponent>,
    private filiereService: FiliereService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllUfs();
    this.getFiliers();
    this.getAllPatients();
    console.log(this.editData)
     if(typeof(this.editData) === 'object' && this.editData !== null && this.editData.action === 'f') {
      this.onFilierSelected(this.editData.selectedUf.idFiliere)
      this.selectedFilier = this.editData.selectedUf.idFiliere;
      this.selectedUf = this.editData.selectedUf.id; 
    } 

    this.reservationForm = this.formBuilder.group({
      dateDebut : ['',Validators.required],
      dateFin : [''],
      patient : ['',Validators.required],
      filier : ['',Validators.required],
      uf : ['',Validators.required],
    });
  }

  addReservation(){
    // si ce  n'est pas le bouton modifier alors appel de la méthode ajouter
    console.log(this.editData.action )
    if(this.editData.action === 'a' || this.editData.action === 'f'){
      if(this.reservationForm.valid){
        let idUf = this.reservationForm.get('uf').value;
        let idPatient = this.reservationForm.get('patient').value;
        let dateD =  this.datePipe.transform(new Date(this.reservationForm.get('dateDebut').value), 'yyyy-MM-dd');
        this.ufService.getCountUf(idUf, dateD).subscribe(
          res => {
            console.log(idPatient)
            this.ufService.getCountPatient(idPatient, dateD).subscribe(
              resP => {
                if( res == 0 && resP == 0 )
                {
                  console.log(res + ' : ' + resP);
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
                else if(resP !== 0)
                {
                  alert('Ce patient a une reservatoin dans cette date ')
                }else {
                  alert('Uf est déja reservée dans cette date ')
                }
              }
            )
          }
        )
      }
    }
    // else if(this.editData.action === 'u'){
    //   this.updateReservation();
    // }
   
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUfs(){
    this.ufService.getUFList().subscribe({
      next:(res) => {
        this.ufs = res;
        this.ufs.sort((a, b) => a.id - b.id)
        // console.log(this.ufs);
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
  onFilierSelected(id = this.reservationForm.get('filier').value) {
    this.filierSelected = true;

    this.ufService.getUfFilier(id).subscribe(res => {
      this.ufs = res;
    })
  }

  getFiliers() {
    this.filiereService.getFiliereList().subscribe({
      next:(res) => {
        this.filiers = res;
      },
      error:(err) =>{
        throw err;
      }
    })
  }
}
