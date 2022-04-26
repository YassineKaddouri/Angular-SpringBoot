import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Reservation } from "../models/reservation.models";
import { ReservationLinks } from "./reservation.links";

@Injectable({
    providedIn: 'root'
  })
export class ReservationService{
  constructor(private http: HttpClient, private links : ReservationLinks) { }
   createReservation(reservation: Object): Observable<Object> {
    return this.http.post(`${this.links.RESERVATION_ADD_LINK}`, reservation);
  }

  getReservationList(): Observable<any> {
    return this.http.get(`${this.links.GET_LIST_LINK}`);
  }

  updateReservation(reservation: Reservation, id: number): Observable<Object>{
    return this.http.put(`${this.links.UPDATE_RESERVATION_LINK}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<object>{
    return this.http.delete(`${this.links.DELETE_RESERVATION_LINK}/${id}`);
  }

  getPatientList(): Observable<any> {
    return this.http.get(`${this.links.GET_PATIENTS_LINK}`);
  }
  
}