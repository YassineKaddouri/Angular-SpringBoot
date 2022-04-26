import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UfLinks } from './uf.links';
import { Observable } from 'rxjs';
import { Uf } from '../models/uf.models'
@Injectable({
  providedIn: 'root'
})
export class UfService {

  constructor(private http: HttpClient, private links : UfLinks) { }

 /*getSite(id: number): Observable<Uf> {
    return this.http.get<Site>(`${this.baseUrl1}/${id}`);
  }*/

  createUf(uf: Object): Observable<Object> {
    return this.http.post(`${this.links.UF_ADD_LINK}`, uf);
  }

  getUFList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }
  getUFCretiers(data): Observable<any> {
    
    return this.http.get(`${this.links.GET_LIST_LINK_c}${data}`,);
  }
  getUFDetails(data): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK_d}${data}`,);
  }
  updateUf(uf: Uf, id: number): Observable<Object>{
    console.log(this.links.UPDATE_LIST_LINK+'/'+id);
    return this.http.put(`${this.links.UPDATE_LIST_LINK}/${id}`, uf);
  }

  deleteUf(id: number): Observable<object>{
    return this.http.delete(`${this.links.DELETE_UF_LINK}/${id}`);
  }
  getUF(id: number): Observable<any> {
    return this.http.get(`${this.links.GET_UF_LINK}/${id}`);
  }

  getUfFiliere(id: number): Observable<any> {
    return this.http.get(`${this.links.GETUF_UF_LINK}/${id}`);
  }

}

