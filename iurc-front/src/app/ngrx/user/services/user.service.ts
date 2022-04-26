import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLinks } from './user.links';
import { catchError, Observable } from 'rxjs';

import { User } from '../../app-state/models/user.model';
import { SignupRequest } from '../../app-state/models/signup-request.model';
import { Patient } from '../../reservation/models/patient.models';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient, private links : UserLinks) { }
  
  updatePatient(signupRequest: SignupRequest): Observable<any>{
    return this.http.put(`${this.links.UPDATE_LIST_LINK}/users/${signupRequest.id}`,this.getFormData(signupRequest)).pipe(
      catchError(
        error => {
          console.log('error from update user for this reason')
          throw error
        }
      )
    );
  }
  // constructor(private http: HttpClient, private links : UserLinks) { }
  // updatePatient(id :number , user:User): Observable<any>{
  //   return this.http.put(`${this.links.UPDATE_LIST_LINK}/users/${id}`,user).pipe(
  //     catchError(
  //       error => {
  //         console.log('error from update user for this reason')
  //         throw error
  //       }
  //     )
  //   );
  // }

  private  getFormData(signupRequest:SignupRequest) {
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(signupRequest)], { type: "application/json"})
    signupRequest.imageFile && formData.append('file', signupRequest.imageFile);
    formData.append('signupRequest', blob);
    console.log(signupRequest)
    return  formData;
  }
}

