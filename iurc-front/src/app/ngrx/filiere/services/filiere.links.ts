import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class FiliereLinks {
    public readonly FILIERE_ADD_LINK = 'http://localhost:8080/iurc/filiere/save';
    public readonly GET_LIST_LINK = 'http://localhost:8080/iurc/filieres';
    public readonly UPDATE_FIL_LINK = 'http://localhost:8080/iurc/updatefiliere';
    public readonly DELETE_FIl_LINK = 'http://localhost:8080/iurc/deletefiliere'
}