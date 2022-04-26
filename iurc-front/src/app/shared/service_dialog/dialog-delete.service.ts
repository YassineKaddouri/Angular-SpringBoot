import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/modules/filiere/confirm-delete/confirm-delete.component';


@Injectable({
  providedIn: 'root'
})
export class DialogDeleteService {
  constructor(private dialog: MatDialog) { }
  openConfirmDialog(msg){
    return this.dialog.open(ConfirmDeleteComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message :msg
      }
    });
  }
}
