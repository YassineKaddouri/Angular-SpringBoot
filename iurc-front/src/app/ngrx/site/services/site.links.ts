import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class SiteLinks {
    public readonly SITE_ADD_LINK = 'http://localhost:8080/iurc/site/save';
    public readonly GET_LIST_LINK = 'http://localhost:8080/iurc/sites';
    public readonly UPDATE_LIST_LINK = 'http://localhost:8080/iurc/update';
    public readonly DELETE_SITE_LINK = 'http://localhost:8080/iurc/delete';
    public readonly ADD_FIL_TO_SITE = 'http://localhost:8080/iurc/filiere/addToSite';

}