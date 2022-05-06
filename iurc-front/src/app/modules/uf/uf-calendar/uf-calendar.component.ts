import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-uf-calendar',
  templateUrl: './uf-calendar.component.html',
  styleUrls: ['./uf-calendar.component.scss']
})
export class UfCalendarComponent implements OnInit {
  displayedColumns: string[] = ['date Debut','date Fin', 'Patient'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  uf :any;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    //this.uf=this.data;
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.sort = this.sort;
    console.log(this.data)
  }

}
