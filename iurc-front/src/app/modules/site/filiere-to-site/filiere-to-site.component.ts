import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';

import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { Site } from 'src/app/ngrx/site/models/site.models';
import { SiteService } from 'src/app/ngrx/site/services/site.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';
import { FiliereListComponent } from '../../filiere/filiere-list/filiere-list.component';


@Component({
  selector: 'app-filiere-to-site',
  templateUrl: './filiere-to-site.component.html',
  styleUrls: ['./filiere-to-site.component.scss']
})
export class FiliereToSiteComponent implements OnInit {

  siteFilForm !: FormGroup;
  sites: any;
  //site: Site[];
  //filiers :Filiere;
  //filiere :Filiere[] ;
  @Input() site: Site[];
  @Input() filiere: Filiere[] = []

  private filiereList: FiliereListComponent;

  constructor(private formBuilder: FormBuilder, private filiereService: FiliereService,
    private siteService: SiteService, private notificationService: NotificationService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getFiliere();
    this.getSite();

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

  public getSite(): void {
    this.siteService.getSiteList().subscribe(
      (response: Site[]) => {
        this.site = response;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }



    );
  }






  submit() {
    if (this.siteFilForm.valid) {
      // let site = this.site ? { ...this.site,
      //   ...this.siteFilForm.value,
      //   name : this.siteFilForm.get('site'),
      //      filiere:{
      //        name:this.siteFilForm.get('filiers')
      //      }


      //  } : {
      //    ...this.siteFilForm.value,
      //    name : this.siteFilForm.get('site'),
      //     filiere:{
      //       name:this.siteFilForm.get('filiers').value
      //      }

      let site = {
        siteName: this.siteFilForm.get('site').value,
        filiereName: this.siteFilForm.get('filiers').value,
      }
      console.log(site)
      this.siteService.addFiliereToSite(site).subscribe({
        next: (res) => {
          //alert("SUCCESS");
          this.notificationService.success('Enregistrement réussi!')
          //this.siteFilForm.reset();
          window.location.reload();
        },
        error: () => {
          alert("ERROR!!!")
        }
      })
    };

    


  }
}





