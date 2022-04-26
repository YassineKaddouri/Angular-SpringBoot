import { Component, Inject, OnInit } from '@angular/core';
import { Patient } from 'src/app/ngrx/patient/models/patient.models';
import { PatientService } from 'src/app/ngrx/patient/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  patient: Patient = new Patient();
  
  constructor(private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.patient = this.data;
  }

  onSubmit(){  
    this.patientService.updatePatient(this.data.id, this.patient).subscribe(
       data =>{
      console.log(data);
      this.showToaster();
      this.dialog.closeAll();
      
     },
   err=>{
     this.showerror();
   }
    )
  }
  onNoClick():void {
  this.dialog.closeAll();
}
showToaster(){
  this.toastr.success("le patient bien modifier")

}
showerror(){
  this.toastr.error("err");
}
}
