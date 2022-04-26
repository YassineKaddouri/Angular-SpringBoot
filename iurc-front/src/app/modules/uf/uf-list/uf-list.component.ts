import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Uf } from 'src/app/ngrx/uf/models/uf.models';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUfComponent } from '../create-uf/create-uf.component';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { DialogDeleteService } from 'src/app/shared/service_dialog/dialog-delete.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { UfState } from 'src/app/ngrx/uf/models/ufStat.models';
import { Occupation } from 'src/app/ngrx/uf/models/occupation.models';
import { DatePipe } from '@angular/common';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';

@Component({
  selector: 'app-uf-list',
  templateUrl: './uf-list.component.html',
  styleUrls: ['./uf-list.component.scss'],
  providers: [DatePipe]
})
export class UfListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status','patient', 'action'];
  dataSource: MatTableDataSource<any>;

  //
  listUfs: any = [];
  listReservation: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ufs: Array<UfState> = [];
  uf: any;
  filieres:Filiere[];
  selectedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  constructor(private dialog: MatDialog, private ufService: UfService, private route: Router,
    private dialogDeleteService: DialogDeleteService,
    private notificationService: NotificationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    //this.getAllUfs();
    this.getUfs()
    this.ufService.getUFCretiers(this.selectedDate).subscribe(res => {
      console.log(res);
    })
  }
  getAllUfs() {
    this.ufService.getUFList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
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
    //console.log(this.selectedDate)
    this.ufService.getUFDetails(this.selectedDate).subscribe({
      next: (res) => {
        this.listReservation = res;
        //console.log(res)
        for (let i = 0; i < this.listUfs.length; i++) {
          if (!this.listReservation.find(r => r.uf.id == this.listUfs[i].id)) {
            //console.log("dispo");
            let u = new UfState();
            u.id = this.listUfs[i].id;
            u.name = this.listUfs[i].name;
            // u.patient = this.listReservation.find(r => r.uf.id == this.listUfs[i].id).patient;
            u.status = "disponible";
            u.color = "#a2cf6e"
            this.ufs.push(u);
          }
          else {
            for (let j = 0; j < this.listReservation.length; j++) {
              if (!this.ufs.find(e => e.id == this.listReservation[j].uf.id)) {
                this.uf = this.listUfs.find(e => e.id == this.listReservation[j].uf.id)
                //console.log(this.uf.id);
                if (this.listReservation[j].dateFin === null) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.patient = this.listReservation[j].patient;
                  u.status = "occupée";
                  u.color = "#ef5350"
                  this.ufs.push(u);
                }
                else if (this.listReservation[j].dateDebut <= this.selectedDate && this.listReservation[j].dateFin >= this.selectedDate) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.patient = this.listReservation[j].patient;
                  u.status = "occupée pendant-[" + this.datePipe.transform(this.listReservation[j].dateDebut, 'yyyy-MM-dd') + "," + this.datePipe.transform(this.listReservation[j].dateFin, 'yyyy-MM-dd') + ']\n';
                  u.color = "#ffff8d";                  var num = new Array();
                  num.push(this.listReservation[j].id);
                  u.idReservation = num;
                  this.ufs.push(u);
                }
                //disponible ms
                else if (this.listReservation[j].dateDebut!== this.selectedDate && this.listReservation[j].dateDebut > this.selectedDate && this.listReservation[j].dateFin !== null) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.patient = this.listReservation[j].patient;
                  u.status = "disponible ms occupée pendant-[" + this.datePipe.transform(this.listReservation[j].dateDebut, 'yyyy-MM-dd') + "," + this.datePipe.transform(this.listReservation[j].dateFin, 'yyyy-MM-dd') + "]\n";
                  u.color = "#ffac33";
                  var num = new Array();
                  num.push(this.listReservation[j].id);
                  u.idReservation = num;
                  this.ufs.push(u);
                }
                else if (this.listReservation[j].dateDebut < this.selectedDate && this.listReservation[j].dateFin !== null && this.listReservation[j].dateFin <= this.selectedDate) {
                  let u = new UfState();
                  u.id = this.listReservation[j].uf.id;
                  u.name = this.uf.name;
                  u.patient = this.listReservation[j].patient;
                  u.status = "disponible";
                  u.color = "#a2cf6e";
                  var num = new Array();
                  num.push(this.listReservation[j].id);
                  u.idReservation = num;
                  this.ufs.push(u);
                }
              }
              //uf a plusieurs reservations
              else {
                const reservation: any[] = this.listReservation.filter(e => e.uf.id === this.listReservation[j].uf.id
                  && e.id !== this.listReservation[j].id && e.dateDebut < this.listReservation[j].dateDebut);
                console.log(reservation)
                for (let k = 0; k < reservation.length; k++) {
                  if (reservation[k].dateDebut <= this.selectedDate && reservation[k].dateFin < this.listReservation[j].dateDebut) {
                    //console.log(reservation[k].uf.id)
                    let today = new Date().toLocaleDateString()
                    this.ufs.forEach(uf => {
                      console.log(uf.id)
               
                        if (uf.id === this.listReservation[j].uf.id && !uf.idReservation.find(a => a === this.listReservation[j].id)) {
                          if (this.listReservation[j].dateFin !== null) {
                            uf.status += "occupée pendant[" + this.datePipe.transform(this.listReservation[j].dateDebut, 'yyyy-MM-dd') + "," + this.datePipe.transform(this.listReservation[j].dateFin, 'yyyy-MM-dd') + "]\n";
                            uf.color = "#ffff8d";
                            var num = new Array();
                            num.push(this.listReservation[j].id);
                           // num.concat( uf.idReservation)
                            uf.idReservation.push(this.listReservation[j].id);
                            console.log(uf.idReservation)
                          } else {
                            uf.status = "occupée";
                            uf.color = "#ef5350";
                          }
                        }  
                      
                     
                    });
                  }
                  if ( reservation[k].dateDebut!== this.selectedDate && reservation[k].dateDebut > this.selectedDate && reservation[k].dateFin < this.listReservation[j].dateDebut) {
                    // console.log(reservation[k].uf.id)
                    this.ufs.forEach(uf => {
                     // console.log(uf.idReservation);
                      if (uf.id === this.listReservation[j].uf.id && !uf.idReservation.find(a => a === this.listReservation[j].id)) {
                        if (this.listReservation[j].dateFin !== null) {
                          uf.status += "disponible ms occupée pendant[" + this.datePipe.transform(this.listReservation[j].dateDebut, 'yyyy-MM-dd') + "," + this.datePipe.transform(this.listReservation[j].dateFin, 'yyyy-MM-dd') + "]\n";
                          uf.color = "#ffac33";
                          var num = new Array();
                          num.push(this.listReservation[j].id);
                          console.log(this.listReservation[j].id+"--")
                          uf.idReservation.push(this.listReservation[j].id);
                          console.log(uf.idReservation+"-")
                        } else {
                          uf.status = "occupée";
                          uf.color = "#ef5350";
                          //let occupation = new Occupation();
                        }
                      }
                    });
                  }
                }
              }
            }
          }
        }
        this.dataSource = new MatTableDataSource(this.ufs.sort());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data);
      },
      error: (err) => {
        alert("Erreur lors de télécharger les données!!")
      }
    });
  }


  //update site
  editUf(row: any) {
    this.dialog.open(CreateUfComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {  /***     whenever we would like to update a uf its gonna refresh by itself */
      if (val == 'modifier') {
        this.getAllUfs();
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
    this.dialog.open(CreateUfComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {        /***     tous ça pourque la fenetre va actualiser lors d'ajout */
      if (val == 'enregistrer') {
        this.getAllUfs();
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
              window.location.reload();
              this.notificationService.success("Uf supprimer")
            }, error: () =>
              alert("erreur")
          })
        }
      });
    // this.ufService.deleteUf(id).subscribe({
    //   next: (res) => {
    //     alert("Uf supprimer")
    //   },
    //   error: () => {
    //     alert("Erreur lors de suppression")
    //   }

    // })
    // window.location.reload();
  }
  checkDate(event) {
    if (event) {
      this.selectedDate = this.datePipe.transform(event, 'yyyy-MM-dd');
      //console.log(this.selectedDate)
    } else {
      this.selectedDate = this.datePipe.transform(new Date().toLocaleDateString(), 'yyyy-MM-dd');
      //console.log(this.selectedDate)
    }
    this.getUfs();
  }

}