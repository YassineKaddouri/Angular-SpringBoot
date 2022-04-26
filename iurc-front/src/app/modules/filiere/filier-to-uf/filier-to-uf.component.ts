import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { FiliereListComponent } from '../filiere-list/filiere-list.component';

@Component({
  selector: 'app-filier-to-uf',
  templateUrl: './filier-to-uf.component.html',
  styleUrls: ['./filier-to-uf.component.scss']
})
export class FilierToUfComponent implements OnInit {

  siteFilForm !: FormGroup;
  sites: any;
  //site: Site[];
  //filiers :Filiere;
  //filiere :Filiere[] ;
  //@Input() site: Site[];
  @Input() filiere: Filiere[] = []

  private filiereList: FiliereListComponent;

  constructor(private formBuilder: FormBuilder, private filiereService: FiliereService,
    private notificationService: NotificationService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getFiliere();
    //this.getSite();

  }

  createForm() {
    this.siteFilForm = this.formBuilder.group({
      site: ['', Validators.compose([Validators.required])],
      filiers: ['', Validators.compose([Validators.required])],
    });

  }

  public getFiliere(): void {
    this.filiereService.getFiliereList().subscribe(
      (response: Filiere[]) => {
        this.filiere = response;
        //console.log(this.filiere);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  // public getSite(): void {
  //   this.siteService.getSiteList().subscribe(
  //     (response: Site[]) => {
  //       this.site = response;

  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }



  //   );
  }








