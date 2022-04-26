import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class UfLinks {
    public readonly UF_ADD_LINK = 'http://localhost:8080/iurc/uf/save';
   public readonly GET_LIST_LINK = 'http://localhost:8080/iurc/uf';
    public readonly GET_LIST_LINK_c = 'http://localhost:8080/iurc/uf/dispo?date=';
    public readonly GET_LIST_LINK_d = 'http://localhost:8080/iurc/uf/detail?date=';
    public readonly UPDATE_LIST_LINK = 'http://localhost:8080/iurc/uf/update';
    public readonly DELETE_UF_LINK = 'http://localhost:8080/iurc/uf/delete';
    public readonly GET_UF_LINK = 'http://localhost:8080/iurc/uf'
    public readonly GETUF_UF_LINK = 'http://localhost:8080/iurc/uf/uf_filier'
}