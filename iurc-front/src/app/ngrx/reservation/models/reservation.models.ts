import { Uf } from "src/app/ngrx/uf/models/uf.models";
import { Patient } from "./patient.models";

export class Reservation{
    id : number;
    dateDebut : Date;
    dateFin : Date;
    Uf;
    Patient;
  

    constructor(){
          
     }
}