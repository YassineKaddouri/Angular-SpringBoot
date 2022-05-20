import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {  } from 'src/app/ngrx/patient/services/patient.service';
import { PatientService } from 'src/app/ngrx/patient/services/patient.service';
import { Patient } from 'src/app/ngrx/patient/models/patient.models';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { UpdatePatientComponent } from '../update-patient/update-patient.component';
import { DetailPatientComponent } from '../detail-patient/detail-patient.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'dateNessance','adresse','telephone','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // pateints: Observable<Patient[]>;
  patients: Patient[];
  constructor( private dialog: MatDialog , 
    private patientService: PatientService,  
    private router: Router,
    private toastr: ToastrService
     ) { }

  ngOnInit(): void {
    this. getPatient();
  }
  getPatient(){
    console.log(1)
    this.patientService.getPateintList().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) =>{
        alert("Erreur lors de télécharger les données!!")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(CreatePatientComponent, {
      // width: '30%'
  
      panelClass: 'my-dialog-class-css',

    }).afterClosed().subscribe(val=>{        
      if(val == 'enregistrer'){
        this.getPatient();
      }
    })
  }

  patientDetails(id: number){
    this.router.navigate(['patient-details', id]);
  }

  open(id) {
    let patient = new Patient();
    patient = this.dataSource['_data']['_value'].find(e => e.id === id);

    this.dialog.open(UpdatePatientComponent, {
      data : patient,
      width: '30%'
    }).afterClosed().subscribe(val=>{        
      if(val == 'modifier'){
        this.getPatient();
      }
    })
  }
  openz(id) {
    let patient = new Patient();
    patient = this.dataSource['_data']['_value'].find(e => e.id === id);

    this.dialog.open(DetailPatientComponent, {
      data : patient,
      width: '30%'
    }).afterClosed().subscribe(val=>{        
      if(val == 'modifier'){
        this.getPatient();
      }
    })
  }
  openzd(id: number){
   this.patientService.deletePatient(id).subscribe(
      data => {
       console.log('ok');
       this.showToaster();
       this.getPatient();
  
      },
      err => {
        this.getPatient()
      }
    )
  }
  showToaster(){
    this.toastr.success("bien supprimer");
  }
}
