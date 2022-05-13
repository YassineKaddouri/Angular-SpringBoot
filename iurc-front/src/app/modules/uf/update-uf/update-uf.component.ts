import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Filiere } from 'src/app/ngrx/filiere/models/filiere.models';
import { FiliereService } from 'src/app/ngrx/filiere/services/filiere.service';
import { Site } from 'src/app/ngrx/site/models/site.models';
import { SiteService } from 'src/app/ngrx/site/services/site.service';
import { Uf } from 'src/app/ngrx/uf/models/uf.models';
import { UfService } from 'src/app/ngrx/uf/services/uf.service';
import { NotificationService } from 'src/app/shared/service_dialog/notification.service';

@Component({
  selector: 'app-update-uf',
  templateUrl: './update-uf.component.html',
  styleUrls: ['./update-uf.component.scss']
})
export class UpdateUfComponent implements OnInit {

  ufForm !: FormGroup;
  actionBtn: string = "Modifier"
  uf : Uf;
  
  filiere: Filiere;
  filiers: Filiere[];
  sites: Site[];
  site: Site;
  constructor(private formBuilder: FormBuilder,
    private ufService: UfService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<UpdateUfComponent>,
    private notificationService: NotificationService,
    private filiereService: FiliereService,
    private toastr: ToastrService,
    private siteService: SiteService) { }

  ngOnInit(): void {
    this.getAllFilieres();
   
    this.ufForm = this.formBuilder.group({
      name: ['', Validators.required],
      filiere: ['', Validators.required],
    });
      this.ufForm.controls['name'].setValue(this.editData.name);
      this.ufForm.controls['filiere'].setValue(this.editData.idFiliere);
  }

  getAllFilieres() {
    this.filiereService.getFiliereList().subscribe({
      next: (res) => {
        this.filiers = res;
      }
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateUf(){
    let uf = this.uf ? {
      ...this.uf,
      ...this.ufForm.value,
      filiere: {
        id: this.ufForm.get('filiere').value
      },
    
    } : {
      ...this.ufForm.value,
      filiere: {
          id: this.ufForm.get('filiere').value
        }

    };
    this.ufService.updateUf(uf,this.editData.id).subscribe({
      next: (res) => {
        // this.notificationService.success('UF Modifié');
        this.showToast();
        this.ufForm.reset();
        this.dialogRef.close('modifier');
        //window.location.reload();
        this.getAllFilieres();
      },
      error: () => {
        // alert("Erreur lors modifier uf")
        this.showError()
      }
    })
  }
  showToast(){
    this.toastr.success("UF Modifié")
    }
    showError(){
      this.toastr.success("Erreur lors modifier uf")
      }

}
