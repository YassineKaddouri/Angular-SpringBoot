import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PatientLinks } from './patient.links';
import { catchError, Observable } from 'rxjs';
import{Patient} from '../models/patient.models'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, private links : PatientLinks) { }

 /*getSite(id: number): Observable<Site> {
    return this.http.get<Site>(`${this.baseUrl1}/${id}`);
  }*/
  //private baseURL :string = "http://localhost:8080/patient";
  createPatient(patient: Object): Observable<Object> {
    return this.http.post(`${this.links.PATIENT_ADD_LINK}`,patient);
  }

 getPateintList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }
  getPatientById(id: number): Observable<Patient>{
    return this.http.get<Patient>(`${this.links.GETID_LIST_LINK}/${id}`);
  }
  updatePatient(id: number, patient: Patient): Observable<any>{
    return this.http.put(`${this.links.UPDATE_LIST_LINK}/patients/${id}`, patient).pipe(
      catchError(
        error => {
          console.log('error from update patient for this reason' )
          throw error
        }
      )
    );
  }
  deletePatient(id: number): Observable<Object>{
    return this.http.delete(`${this.links.DELETE_LIST_LINK}/${id}`, {headers: { "Accept": "application/json", "Content-Type": "application/json" } }).pipe(
      catchError(
        error => {
          console.log('error from delete patient for this reason' )
          throw error.error
        }
      )
    );
  }
  
  /*updateSite(id: number, site: Site): Observable<object>{
    return this.http.put(`${this.baseUrl4}/${id}`, site);
  }
   updateSite(site: Site, id: number): Observable<Object>{
    return this.http.put(`${this.links.UPDATE_LIST_LINK}/${id}`, site);
  }

  deleteSite(id: number): Observable<object>{
    return this.http.delete(`${this.baseUrl5}/${id}`);
  }*/



}

