import { Component, OnInit , ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SiteService } from 'src/app/ngrx/site/services/site.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Site } from 'src/app/ngrx/site/models/site.models';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateSiteComponent } from '../create-site/create-site.component';
@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'address', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sites: Observable<Site[]>;
  constructor( private dialog: MatDialog , private siteService: SiteService, private route: Router) { }

  ngOnInit(): void {
    this.getAllSites();
  }
  getAllSites(){
    this.siteService.getSiteList().subscribe({
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
  //update site
  editSite(row: any){
    this.dialog.open(CreateSiteComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val =>{  /***     whenever we would like to update a site its gonna refresh by itself */
      if(val == 'modifier'){
        this.getAllSites();
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
    this.dialog.open(CreateSiteComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{        /***     tous ça pourque la fenetre va actualiser lors d'ajout */
      if(val == 'enregistrer'){
        this.getAllSites();
      }
    })
  }

  //DELETE
   deleteSite(id : number){
     this.siteService.deleteSite(id).subscribe({
       next:(res)=>{
         alert("Site supprimer");
         window.location.reload()
       },
       error:()=>{
         alert("Erreur lors de suppression")
       }

     })

   }
 

}
