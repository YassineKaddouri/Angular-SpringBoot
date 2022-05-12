import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../models/login-request.model';
import { LoginResponse } from '../../models/login-response.model';
import { AuthLinks } from '../auth.links';
import jwt_decode from 'jwt-decode';
import { User } from '../../models/user.model';
import { UserIdleConfig } from 'angular-user-idle';
import { SignupRequest } from '../../models/signup-request.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username;
  password;
   constructor(private http: HttpClient, private links: AuthLinks) { }

  // login(loginRequest: LoginRequest): Observable<LoginResponse> {
  //   console.log(loginRequest);
  //   return this.http.post<LoginResponse>(this.links.LOGIN_LINK, loginRequest);
  // }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {

    console.log("hello");
      const body = new HttpParams()
        .set('username', loginRequest.username)
        .set('password', loginRequest.password);

      return this.http.post<LoginResponse>(this.links.LOGIN_LINK,
        body.toString(),
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        }
      );
  }

    signup(signupRequest: SignupRequest): Observable<any> {

      return this.http.post<any>(this.links.SIGNUP_LINK, signupRequest);
  }

  private  getFormData(signupRequest:SignupRequest) {
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(signupRequest)], { type: "application/json"})
    signupRequest.imageFile && formData.append('file', signupRequest.imageFile);
    formData.append('signupRequest', blob);
    return  formData;
  }
    static getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  static getUser(): User | null {
    const token = localStorage.getItem('token') ? localStorage.getItem('token').split(' ')[1] : null;

      let user :User={
        id:Number(localStorage.getItem('id')),
        username:localStorage.getItem('username'),
        name:localStorage.getItem('name'),
        image:localStorage.getItem('image'),
         // firstname:localStorage.getItem('firstname'),
          //lastname:localStorage.getItem('lastname'),
          //email:localStorage.getItem('email'),
          roles:[],
         // dob:'',
        }

    return token ? user : null;
  }

  static getToken(): string {
    return localStorage.getItem('token');
  }

  static getIsLoggedIn(): boolean {
    if (this.getToken() && this.getToken().split(' ')[1] && this.getToken().split(' ')[1].split('.')[0]) {
      try {
        return JSON.parse(atob(this.getToken().split(' ')[1].split('.')[0])).typ == 'JWT';
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  }

  getUserList(): Observable<any> {
    return this.http.get(`${this.links.GET_LISTUSER_LINK}`);
  }
  createRoleUser(user: Object): Observable<Object> {
    return this.http.post(`${this.links.ROLE_USER_ADD_LINK}`, user);
  }
  deleteUser(id: number): Observable<object>{
    return this.http.delete(`${this.links.DELETE_USER_LINK}/${id}`);
  }
}

