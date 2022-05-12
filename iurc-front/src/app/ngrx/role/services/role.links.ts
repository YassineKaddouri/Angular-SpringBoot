import { environment } from '../../../../environments/environment';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root',
})
export class RoleLinks {
     public readonly ROLE_ADD_LINK = 'http://localhost:8080/iurc/role/save';
     public readonly GET_LIST_LINK = 'http://localhost:8080/iurc/role/getRole';
    // //public readonly .baseURL= 'http://localhost:8080/patient/{id}';
    // public readonly GETID_LIST_LINK = 'http://localhost:8080/patient';
    // public readonly UPDATE_LIST_LINK = 'http://localhost:8080/patient';
    // public readonly DELETE_LIST_LINK = 'http://localhost:8080/patient';
    public readonly DELETE_ROLE_LINK = 'http://localhost:8080/iurc/role';
}
