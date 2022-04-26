import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { Role } from 'src/app/ngrx/role/models/role.models';
import { RoleService } from 'src/app/ngrx/role/services/role.service';
import { CreateRoleComponent } from '../create-role/create-role.component';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit {

 
  displayedColumns: string[] = ['id', 'name','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // pateints: Observable<Patient[]>;
  roles: Role[];
  constructor( private dialog: MatDialog , 
    private roleService: RoleService,
    private router: Router,
    //private toastr: ToastrService
     ) { }


  ngOnInit(): void {
    this.getRole();
  }
  getRole(){
    console.log(1)
    this.roleService.getRoleList().subscribe({
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
  openDialog() {
    this.dialog.open(CreateRoleComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {        /***     tous ça pourque la fenetre va actualiser lors d'ajout */
      if (val == 'enregistrer') {
        this.getRole();
      }
    })
  }
}
