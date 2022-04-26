import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ReservationService } from 'src/app/ngrx/reservation/services/reservation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/ngrx/reservation/models/reservation.models';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { UpdateReservationComponent } from '../update-reservation/update-reservation.component';
import { DialogDeleteService } from 'src/app/shared/service_dialog/dialog-delete.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  displayedColumns: string[] = ['id','date_debut', 'date_fin', 'patient', 'uf', 'action'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  reservations: Observable<Reservation[]>;

  
  constructor(private dialog: MatDialog , private reservationService: ReservationService, private route: Router,
    private dialogDeleteService : DialogDeleteService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllReservations()
  }
  getAllReservations(){
    this.reservationService.getReservationList().subscribe({
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
      this.dataSource.filter = filterValue;
    }
   
    this.dataSource.filterPredicate = (data: any , filter: string) => {
      console.log(data.patient.nom)
      console.log(filter)
      if(data.patient.nom.includes(filter) || data.patient.prenom.includes(filter))
        return data; 
     };
  }
  openDialog() {
    this.dialog.open(CreateReservationComponent, {
      panelClass: 'my-dialog-class-css'
    }).afterClosed().subscribe(val=>{        /***     tous ça pourque la fenetre va actualiser lors d'ajout */
      if(val == 'enregistrer'){
        this.getAllReservations();
      }
    })
  }

    //update site
    editReservation(row: any){
      this.dialog.open(UpdateReservationComponent,{
       // width: '30%',
        data:row
      }).afterClosed().subscribe(val =>{  /***     whenever we would like to update a site its gonna refresh by itself */
        if(val == 'modifier'){
          this.getAllReservations();
        }
      })
    }

  //DELETE
  deleteReservation(id : number){
    this.dialogDeleteService.openConfirmDialog('Êtes-vous sûr de vouloir supprimer?')
.afterClosed().subscribe(res =>{
  if(res){
    this.reservationService.deleteReservation(id).subscribe({
      next:(res)=>{
        //alert("delete")
        window.location.reload();
        this.notificationService.success('Reservation supprimé!')
      },
      error:()=>
      alert("erreur")
    })
  }
});
//     this.reservationService.deleteReservation(id).subscribe({
//       next:(res)=>{
//         alert("Resertvation supprimer")
//       },
//       error:()=>{
//         alert("Erreur lors de suppression")
//       }

//     })
// window.location.reload()
  }

}
