import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class UfLinks {
    public readonly UF_ADD_LINK ='http://localhost:8080/iurc/uf/save';
    public readonly GET_LIST_LINK ='http://localhost:8080/iurc/uf';
    public readonly GET_LIST_LINK_c='http://localhost:8080/iurc/uf/dispo?date=';
    public readonly GET_LIST_LINK_d ='http://localhost:8080/iurc/uf/detail?date=';
    public readonly UPDATE_LIST_LINK ='http://localhost:8080/iurc/uf/update';
    public readonly DELETE_UF_LINK ='http://localhost:8080/iurc/uf/delete';
    public readonly GET_UF_LINK ='http://localhost:8080/iurc/uf';
    public readonly GET_STATE_LINK ='http://localhost:8080/iurc/uf/status';
    public readonly UF_FIL_LINK = 'http://localhost:8080/iurc/uf/uf_filier';
    public readonly GET_COUNT_UF_LINK ='http://localhost:8080/iurc/uf/countUF';
    public readonly GET_COUNT_PATIENT_LINK ='http://localhost:8080/iurc/uf/countPatient';
    public readonly GET_Uf_FILIER_LINK = 'http://localhost:8080/iurc/uf/uf_filier';
}