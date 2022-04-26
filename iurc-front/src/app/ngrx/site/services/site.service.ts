import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteLinks } from './site.links';
import { Observable } from 'rxjs';
import { Site } from '../models/site.models'
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient, private links : SiteLinks) { }

 /*getSite(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.baseUrl1}/${id}`);
  }*/

  createSite(site: Object): Observable<Object> {
    return this.http.post(`${this.links.SITE_ADD_LINK}`, site);
  }

  getSiteList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }

  updateSite(site: Site, id: number): Observable<Object>{
    return this.http.put(`${this.links.UPDATE_LIST_LINK}/${id}`, site);
  }

  deleteSite(id: number): Observable<object>{
    return this.http.delete(`${this.links.DELETE_SITE_LINK}/${id}`);
  }


  addFiliereToSite(site: any): Observable<object>{
    return this.http.post(`${this.links.ADD_FIL_TO_SITE}`,site);

  }


}

