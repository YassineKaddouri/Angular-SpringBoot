import { environment } from '../../../../environments/environment';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class UserLinks {
    //public readonly PATIENT_ADD_LINK = 'http://localhost:8080/patient/save';
    //public readonly GET_LIST_LINK = 'http://localhost:8080/patient';
    //public readonly .baseURL= 'http://localhost:8080/patient/{id}';
    //public readonly GETID_LIST_LINK = 'http://localhost:8080/patient';
    public readonly UPDATE_LIST_LINK = 'http://localhost:8080/iurc';
    //public readonly DELETE_LIST_LINK = 'http://localhost:8080/patient';
}