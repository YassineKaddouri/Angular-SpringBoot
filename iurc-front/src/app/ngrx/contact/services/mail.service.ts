import { Injectable } from '@angular/core';
import { MailLinks } from './mail.links';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient, private links : MailLinks) { }

  // getFiliereList(): Observable<any> {
  //   return this.http.get(`${this.links.GET_LIST_LINK}`);
  // }

  createMails(mail: Object): Observable<Object> {
    return this.http.post(`${this.links.MAIL_ADD_LINK}`, mail);
  }

  // updateFiliere(filiere : Filiere, id: number): Observable<Object>{
  //   return this.http.put(`${this.links.UPDATE_FIL_LINK}/${id}`, filiere);
  // }

  // deleteFiliere(id: number): Observable<object>{
  //   return this.http.delete(`${this.links.DELETE_FIl_LINK}/${id}`);
  // }

}
