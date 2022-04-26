import { Injectable } from '@angular/core';
import { FiliereLinks } from './filiere.links';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Filiere } from '../models/filiere.models';
@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private http: HttpClient, private links : FiliereLinks) { }

  getFiliereList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }

  createFiliere(filiere: Object): Observable<Object> {
    return this.http.post(`${this.links.FILIERE_ADD_LINK}`, filiere);
  }

  updateFiliere(filiere : Filiere, id: number): Observable<Object>{
    return this.http.put(`${this.links.UPDATE_FIL_LINK}/${id}`, filiere);
  }

  deleteFiliere(id: number): Observable<object>{
    return this.http.delete(`${this.links.DELETE_FIl_LINK}/${id}`);
  }

}
