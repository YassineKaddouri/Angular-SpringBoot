import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/ngrx/patient/models/patient.models';
import { PatientService } from 'src/app/ngrx/patient/services/patient.service';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { PatientModule } from '../patient.module';
//import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',

  styleUrls: ['./create-patient.component.scss'],
 
})
export class CreatePatientComponent implements OnInit {
  patientForm: FormGroup;
  numRegex!:RegExp;
 patient: Patient = new Patient();
  constructor(private dialog: MatDialog,private formBuilder : FormBuilder ,private patientService: PatientService,
    private router: Router ,private dialogRef: MatDialogRef<CreatePatientComponent>,
    private toastr: ToastrService, private notificationService: NotificationService,
    private location: Location



    ) { }

  ngOnInit(): void {
 
    this.patientForm = this.formBuilder.group({
      nom : ['',Validators.required],
      prenom : ['',Validators.required],
      dateNessance: ['',Validators.required],
      adresse : ['',Validators.required],
      telephone : ["", Validators.compose([Validators.required, Validators.maxLength(10)])],
    });
   
  }

  savePatient(){
    // if(this.siteForm.valid){
if(this.patientForm.valid){
    this.patientService.createPatient(this.patient).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close('enregistrer');
        this.showToaster();  
        //this.location.back()
    //  window.location.reload();        
      },
      err => {
        //this.showerror(err);
        this.showerror();
      }
    )

     }
  }
  goToPatientList(){
    this.router.navigate(['patient/list'])
    .then(() => {
      window.location.reload();
    })
  }
  onSubmit(){
    console.log(this.patient);
    this.savePatient();
  }

  close() {
    this.dialog.closeAll();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  showToaster(){
    this.toastr.success("le patient a ete bien enregistrer")
 
  }
  showerror(){
    this.toastr.error("err");
  }
}
