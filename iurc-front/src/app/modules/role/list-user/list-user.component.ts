import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/ngrx/app-state/models/user.model';
import { AuthService } from 'src/app/ngrx/app-state/services/auth/auth.service';
import { RoleService } from 'src/app/ngrx/role/services/role.service';
import { DialogDeleteService } from 'src/app/shared/service_dialog/dialog-delete.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns: string[] = ['id','name','username','image','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // pateints: Observable<Patient[]>;
 roleForm !: FormGroup;
Users:User[];
  constructor( private dialog: MatDialog , 
    private roleService: RoleService,
    private userService: AuthService,
    private router: Router,
    private dialogDeleteService : DialogDeleteService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    // @Inject(MAT_DIALOG_DATA) public editData : any,
    // private dialogRef: MatDialogRef<ListRoleComponent>,
    private formBuilder : FormBuilder,
     ) { }


  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name : ['',Validators.required]

    });
   this.getUser();
  }
  getUser(){
    console.log(1)
    this.userService.getUserList().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
  
        console.log(res);
    
  
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

  //DELETE
  deleteUser(id : number){
    this.dialogDeleteService.openConfirmDialog('Êtes-vous sûr de vouloir supprimer?')
.afterClosed().subscribe(res =>{
  if(res){
    this.userService.deleteUser(id).subscribe({
      next:(res)=>{
        //alert("delete")
        // this.notificationService.success('Reservation supprimé!')
        
      }
    })
     window.location.reload();
    this.getUser()
    this.showtoast()
  }
});

}

showtoast(){
  this.toastr.success("jjjj")
}
}


