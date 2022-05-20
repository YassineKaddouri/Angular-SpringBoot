import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUfComponent } from '../create-uf/create-uf.component';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { DialogDeleteService } from 'src/app/shared/service_dialog/dialog-delete.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { UfState } from 'src/app/ngrx/uf/models/ufStat.models';
import { Occupation } from 'src/app/ngrx/uf/models/occupation.models';
import { DatePipe } from '@angular/common';
import { PatientService } from 'src/app/ngrx/patient/services/patient.service';
import { CreateReservationComponent } from '../../reservation/create-reservation/create-reservation.component';
import { UfCalendarComponent } from '../uf-calendar/uf-calendar.component';
import { ReservationService } from 'src/app/ngrx/reservation/services/reservation.service';
import { UpdateUfComponent } from '../update-uf/update-uf.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uf-list',
  templateUrl: './uf-list.component.html',
  styleUrls: ['./uf-list.component.scss'],
  providers: [DatePipe]
})
export class UfListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'patient', 'action'];
  dataSource: MatTableDataSource<any>;

  //
  listUfs: any = [];
  listReservation: any = [];
  listPatient: any = [];
  allReservation: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ufs: Array<UfState> = [];
  uf: any;
  selectedDate = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
  selectedOutDate = "";
  ;
  constructor(private dialog: MatDialog, private ufService: UfService, private route: Router,
    private dialogDeleteService: DialogDeleteService,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private patientService: PatientService,
    private reservationService: ReservationService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUfs();
    this.getAllUfs();
  }
  getAllUfs() {
    this.ufService.getUFList().subscribe({
      next: (res) => {
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    })
  }

  getUfs() {
    this.ufs.splice(0, this.ufs.length)
    this.ufService.getUFList().subscribe({
      next: (res) => {
        this.listUfs = res;
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    });

    this.patientService.getPateintList().subscribe({
      next: (res) => {
        this.listPatient = res
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    })

    this.reservationService.getReservationList().subscribe({
      next: (res) => {
        this.allReservation = res
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    })
    this.ufService.getUFDetails(this.selectedDate).subscribe({
      next: (res) => {
        this.listReservation = res;
        for (let i = 0; i < this.listUfs.length; i++) {
          if (!this.listReservation.find(r => r.uf.id == this.listUfs[i].id)) {
            let u = new UfState();
            u.id = this.listUfs[i].id;
            u.name = this.listUfs[i].name;
            u.idFiliere = this.listUfs[i].filiere.id;
            u.status = "disponible";
            u.color = "#a2cf6e"
            this.ufs.push(u);
          }
          else {
            for (let j = 0; j < this.listReservation.length; j++) {
              if (!this.ufs.find(e => e.id == this.listReservation[j].uf.id)) {
                this.uf = this.listUfs.find(e => e.id == this.listReservation[j].uf.id)
                if (this.listReservation[j].dateFin === null && this.listReservation[j].dateDebut < this.selectedDate && !this.listReservation.find(e => e.uf.id == this.listReservation[j].uf.id && e.id !== this.listReservation[j].id)) {
                  let u = new UfState();
                  let occupation = new Occupation();
                  let listOccupations = new Array();
                  let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.idFiliere = this.uf.filiere.id
                  u.status = "Occupée";
                  u.color = "#ef5350";
                  occupation.dateDebut = this.listReservation[j].dateDebut;
                  occupation.dateFin = null;
                  listOccupations.push(occupation);
                  var patients = new Array();
                  patients.push(patient);
                  u.listPatient = patients;
                  u.occupation = listOccupations;
                  this.ufs.push(u);
                }
                //******************************************occupée pendant******************************************
                if (this.listReservation[j].dateDebut <= this.selectedDate && this.listReservation[j].dateFin > this.selectedDate) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                  u.name = this.uf.name;
                  u.status = "occupée"
                  //" du " + this.datePipe.transform(this.listReservation[j].dateDebut, 'dd-MM-yyyy') + " au " + this.datePipe.transform(this.listReservation[j].dateFin, 'dd-MM-yyyy') + '\n';
                  u.color = "#ffeb3b";
                  u.idFiliere = this.uf.filiere.id;
                  var num = new Array();
                  let occupation = new Occupation();
                  occupation.dateDebut = this.listReservation[j].dateDebut;
                  occupation.dateFin = this.listReservation[j].dateFin;
                  let listOccupations = new Array();
                  listOccupations.push(occupation);
                  u.occupation = listOccupations;
                  num.push(this.listReservation[j].id);
                  var patients = new Array();
                  patients.push(patient);
                  u.idReservation = num;
                  u.listPatient = patients;
                  this.ufs.push(u);
                }
                //******************************************disponible ms occupée pendant******************************************
                else if (this.listReservation[j].dateDebut != this.selectedDate && this.listReservation[j].dateDebut > this.selectedDate) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                  u.name = this.uf.name;
                  u.idFiliere = this.uf.filiere.id;
                  u.status = "disponible "
                  //"mais occupée du " + this.datePipe.transform(this.listReservation[j].dateDebut, 'dd-MM-yyyy') + " au " + this.datePipe.transform(this.listReservation[j].dateFin, 'dd-MM-yyyy') + "\n";
                  u.color = "#ffac33";
                  var num = new Array();
                  let occupation = new Occupation();
                  occupation.dateDebut = this.listReservation[j].dateDebut;
                  occupation.dateFin = this.listReservation[j].dateFin;
                  let listOccupations = new Array();
                  listOccupations.push(occupation);
                  u.occupation = listOccupations;
                  num.push(this.listReservation[j].id);
                  var patients = new Array();
                  patients.push(patient);
                  u.idReservation = num;
                  u.listPatient = patients;
                  this.ufs.push(u);
                }
                else if (this.listReservation[j].dateDebut <= this.selectedDate && this.listReservation[j].dateFin != null && this.listReservation[j].dateFin <= this.selectedDate) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.idFiliere = this.uf.filiere.id;
                  u.status = "disponible";
                  u.color = "#a2cf6e";
                  var num = new Array();
                  num.push(this.listReservation[j].id);
                  u.idReservation = num;
                  this.ufs.push(u);
                }
              }
              /******************************************uf a plusieurs reservations******************************************/
              else {
                //******************************************occupée pendant******************************************
                const reservation: any[] = this.listReservation.filter(e => e.uf.id === this.listReservation[j].uf.id
                  && e.id !== this.listReservation[j].id && e.dateDebut < this.listReservation[j].dateDebut);
                for (let k = 0; k < reservation.length; k++) {
                  if (reservation[k].dateDebut < this.selectedDate && reservation[k].dateFin < this.listReservation[j].dateDebut) {
                    let today = new Date().toLocaleDateString()
                    this.ufs.forEach(uf => {
                      if (uf.id === this.listReservation[j].uf.id && !uf.idReservation.find(a => a === this.listReservation[j].id)) {
                        let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                        //uf.status += "du " + this.datePipe.transform(this.listReservation[j].dateDebut, 'dd-MM-yyyy') + " au " + this.datePipe.transform(this.listReservation[j].dateFin, 'dd-MM-yyyy') + "\n";
                        uf.color = "#ffeb3b";
                        let occupation = new Occupation();
                        occupation.dateDebut = this.listReservation[j].dateDebut;
                        occupation.dateFin = this.listReservation[j].dateFin;
                        var num = new Array();
                        num.push(this.listReservation[j].id);
                        uf.listPatient.push(patient);
                        uf.idReservation.push(this.listReservation[j].id);
                        uf.occupation.push(occupation);
                      }
                    });
                  }
                  if (reservation[k].dateDebut != this.selectedDate && reservation[k].dateDebut > this.selectedDate
                    && reservation[k].dateFin < this.listReservation[j].dateDebut) {
                    //******************************************disponible ms occupée pendant******************************************
                    this.ufs.forEach(uf => {
                      if (uf.id === this.listReservation[j].uf.id && !uf.idReservation.find(a => a === this.listReservation[j].id)) {
                        let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                        //uf.status += "du " + this.datePipe.transform(this.listReservation[j].dateDebut, 'dd-MM-yyyy') + " au " + this.datePipe.transform(this.listReservation[j].dateFin, 'dd-MM-yyyy') + "\n";
                        uf.color = "#ffac33";
                        let occupation = new Occupation();
                        occupation.dateDebut = this.listReservation[j].dateDebut;
                        occupation.dateFin = this.listReservation[j].dateFin;
                        var num = new Array();
                        num.push(this.listReservation[j].id);
                        uf.idReservation.push(this.listReservation[j].id);
                        uf.listPatient.push(patient);
                        uf.occupation.push(occupation);
                      }
                    });
                  }
                  else {
                    if (reservation[k].dateFin < this.listReservation[j].dateDebut
                      && this.listReservation[j].dateFin == null && this.listReservation[j].dateDebut <= this.selectedDate
                    ) {
                      this.ufs.forEach(uf => {
                        if (uf.id === this.listReservation[j].uf.id && !uf.idReservation.find(a => a === this.listReservation[j].id)) {
                          let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                          uf.status = "occupée";
                          uf.color = "red";
                          let occupation = new Occupation();
                          occupation.dateDebut = this.listReservation[j].dateDebut;
                          occupation.dateFin = null;
                          var num = new Array();
                          num.push(this.listReservation[j].id);
                          uf.idReservation.push(this.listReservation[j].id);
                          uf.listPatient.push(patient);
                          uf.occupation.push(occupation);
                        }
                      });
                    }
                  }
                }
              }
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.ufs.sort((a, b) => a.id - b.id));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    });
  }

  //update uf
  editUf(row: any) {
    console.log(row)
    this.dialog.open(UpdateUfComponent, {
      panelClass: 'my-dialog-class-css',
      data: row,

    }).afterClosed().subscribe(val => {  /***     whenever we would like to update a uf its gonna refresh by itself */
      if (val == 'modifier') {
        this.getUfs();
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
/***     tous ça pourque la fenetre va actualiser lors d'ajout */
  openDialog() {
    this.dialog.open(CreateUfComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {  
      if(val == 'enregistrer'){
        this.getUfs();
      }
    }) 
   
  }

  //DELETE
  deleteUf(id: number) {
    this.dialogDeleteService.openConfirmDialog('Êtes-vous sûr de vouloir supprimer?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.ufService.deleteUf(id).subscribe({
            next: (res) => {
              this.ngOnInit();
              // this.notificationService.success("Uf supprimer")
              this.showToast();
              this.getUfs()
            }, error: () =>
              // alert("erreur")
              this.showError()
          })
        }
      });
    
  }
  checkDate(event) {
    if (event) {
      this.selectedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
      console.log(this.selectedDate)
    } else {
      this.selectedDate = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
    }
    this.getUfs();
    this.selectedOutDate = "";
  }

  openReservationDialog(uf, action) {
    this.dialog.open(CreateReservationComponent, {
      // width: '30%',
      panelClass: 'my-dialog-class-css',
      data: { selectedUf: uf, action: action }
    }).afterClosed().subscribe(val => {
      this.getUfs()   /***     tous ça pourque la fenetre va actualiser lors d'ajout */
    })
  }
  openCalendar(row: any) {
    if (row.status != 'disponible') {
      this.dialog.open(UfCalendarComponent, {
        data: row,
        width: '30%'
      })
    }
  }

  getStatus() {
    this.ufs.splice(0, this.ufs.length)
    this.ufService.getUFList().subscribe({
      next: (res) => {
        this.listUfs = res;
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    });
    this.patientService.getPateintList().subscribe({
      next: (res) => {
        this.listPatient = res;
      },
      error: (err) => {
        alert("Erreur lors de téléchargement des données!")
      }
    })
    let condition = {
      dateDebut: this.selectedDate,
      dateFin: this.selectedOutDate
    }
    console.log(condition)
    this.ufService.getState(condition).subscribe({
      next: (res) => {
        this.listReservation = res;
        console.log(res)
        for (let i = 0; i < this.listUfs.length; i++) {
          if (!this.listReservation.find(r => r.uf.id == this.listUfs[i].id)) {
            let u = new UfState();
            u.id = this.listUfs[i].id;
            u.name = this.listUfs[i].name;
            u.status = "disponible";
            u.color = "#A9CF54";
            this.ufs.push(u);
          } else {
            for (let j = 0; j < this.listReservation.length; j++) {
              if (this.listReservation[j].uf.id == this.listUfs[i].id) {
                if (!this.ufs.find(e => e.id == this.listReservation[j].uf.id)) {
                  let u = new UfState();
                  u.id = this.listUfs[i].id;
                  u.name = this.listUfs[i].name;
                  u.status = "occupée";
                  u.color = "red";
                  let occupation = new Occupation();
                  occupation.dateDebut = this.listReservation[j].dateDebut;
                  occupation.dateFin = this.listReservation[j].dateFin;
                  let listOccupations = new Array();
                  listOccupations.push(occupation);
                  u.occupation = listOccupations;
                  var patients = new Array();
                  let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                  patients.push(patient);
                  u.listPatient = patients;
                  this.ufs.push(u);
                }
                else {
                  let u = this.ufs.find(e => e.id == this.listReservation[j].uf.id);
                  let patient = this.listPatient.find(p => p.id === this.listReservation[j].patient.id);
                  console.log(u)
                  let occupation = new Occupation();
                  occupation.dateDebut = this.listReservation[j].dateDebut;
                  occupation.dateFin = this.listReservation[j].dateFin;
                  var num = new Array();
                  u.listPatient.push(patient);
                  u.occupation.push(occupation);
                  console.log(u.occupation)
                }
              }
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.ufs.sort((a, b) => a.id - b.id));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        alert("ERROR!!!")
      }
    })
  }
  showToast(){
    this.toastr.success("Uf supprimer")
    }
    showError(){
      this.toastr.success("Error supprimer")
      }

}