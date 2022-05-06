import { environment } from '../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class MailLinks {
    public readonly MAIL_ADD_LINK = 'http://localhost:8080/api/mails';
    // public readonly GET_LIST_LINK = 'http://localhost:8080/iurc/filieres';
    // public readonly UPDATE_FIL_LINK = 'http://localhost:8080/iurc/updatefiliere';
    // public readonly DELETE_FIl_LINK = 'http://localhost:8080/iurc/deletefiliere'
}