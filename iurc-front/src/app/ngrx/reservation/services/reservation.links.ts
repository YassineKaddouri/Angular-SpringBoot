import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";




@Injectable({
    providedIn: 'root',
})
export class ReservationLinks {
    public readonly RESERVATION_ADD_LINK = 'http://localhost:8080/reservation/save';
    public readonly GET_LIST_LINK = 'http://localhost:8080/reservation/';
    public readonly UPDATE_RESERVATION_LINK = 'http://localhost:8080/reservation/update';
    public readonly DELETE_RESERVATION_LINK = 'http://localhost:8080/reservation/delete';

    public readonly GET_PATIENTS_LINK = 'http://localhost:8080/patient';

}