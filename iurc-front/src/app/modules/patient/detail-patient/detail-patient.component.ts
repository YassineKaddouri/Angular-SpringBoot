import { Component, OnInit ,Inject} from '@angular/core';
import { Patient } from 'src/app/ngrx/patient/models/patient.models';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/ngrx/patient/services/patient.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss']
})
export class DetailPatientComponent implements OnInit {

  id: number
  patient: Patient
  constructor(private route: ActivatedRoute, 
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.patient = this.data;
  }
  onSubmit(){
    this.patientService.updatePatient(this.data.id, this.patient).subscribe( data =>{
     console.log(data);
     this.dialog.closeAll();
   }
   , error => console.log(error)); 
   console.log(this.patient)
 }

 onNoClick(): void {
  this.dialog.closeAll();
}
}
