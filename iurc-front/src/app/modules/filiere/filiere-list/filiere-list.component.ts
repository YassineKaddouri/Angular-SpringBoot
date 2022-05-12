import { Component, OnInit , ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateFiliereComponent } from '../create-filiere/create-filiere.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { DialogDeleteService } from 'src/app/shared/service_dialog/dialog-delete.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filiere-list',
  templateUrl: './filiere-list.component.html',
  styleUrls: ['./filiere-list.component.scss']
})
export class FiliereListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id' ,'name',  'action'];
  dataSource: MatTableDataSource<any>;
  constructor(private filiereService : FiliereService, private dialog: MatDialog,
    private dialogDeleteService : DialogDeleteService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAllFilieres();
  }
  getAllFilieres(){
    this.filiereService.getFiliereList().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      // ,
      // error:(err) =>{
      //   alert("Erreur lors de télécharger les données!!")
      // }
    })
  }

    //update filière
    editFiliere(row: any){
      this.dialog.open(CreateFiliereComponent,{
        width: '30%',
        data:row
      }).afterClosed().subscribe(val =>{  /***     REFRESH AFTER UPDATE */
      if(val == 'modifier'){
        this.getAllFilieres();
      }
    })
    }

      //DELETE
    deleteFiliere(id : number){

      this.dialogDeleteService.openConfirmDialog('Êtes-vous sûr de vouloir supprimer?')
      .afterClosed().subscribe(res =>{
        if(res){
          this.filiereService.deleteFiliere(id).subscribe({
            next:(res)=>{
              //window.location.reload();
              this.getAllFilieres();
              //this.notificationService.success('Filière supprimer!')
              this.showSuccess();
            },
            error:()=>
           // alert("erreur")
           this.showeError()
          })
          
        }
    

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(CreateFiliereComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{        /***     REFRESH AFTER ADD */
    if(val == 'enregistrer'){
      this.getAllFilieres();
    }
  })
  }

  openDialogDel() {
    this.dialog.open(ConfirmDeleteComponent, {
      width: '30%'
    })
  }


  showSuccess(){
    this.toastr.success('site a ete bien supprime')
  }
  showeError(){
   this.toastr.success("Erreur lors de suppression")
 }
}
