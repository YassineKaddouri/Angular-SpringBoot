import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleLinks } from './role.links';
import { catchError, Observable } from 'rxjs';
import{Role} from '../models/role.models'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient, private links : RoleLinks) { }
 getRoleList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }
  createRole(role: Object): Observable<Object> {
    return this.http.post(`${this.links.ROLE_ADD_LINK}`, role);
  }


}

