import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Mail } from 'src/app/ngrx/contact/models/contact.models';
import { MailService } from 'src/app/ngrx/contact/services/mail.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  mail:Mail = new Mail();
  displayedColumns: string[] = ['id', 'name','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // pateints: Observable<Patient[]>;
  
  constructor( private dialog: MatDialog , 

    private router: Router,
    private mailservice:MailService,
    private toastr: ToastrService
     ) { }


  ngOnInit(): void {
  
  }
  saveMails(){
    // if(this.siteForm.valid){

    this.mailservice.createMails(this.mail).subscribe(
      data => {
        console.log(data);
      
        this.showToaster();          
      },
      err => {
        //this.showerror(err);
        this.showerror();
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showToaster(){
    this.toastr.success("le mail a ete bien envoyer")
 
  }
  showerror(){
    this.toastr.error("err");
  }
  onSubmit(){
    console.log(this.mail);
    this.saveMails();
  }
}
