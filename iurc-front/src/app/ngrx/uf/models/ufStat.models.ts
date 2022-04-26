import { Patient } from "../../reservation/models/patient.models";
import { Occupation } from "./occupation.models";

export class UfState{
    id: number;
    idReservation: any[];
    name: string;
    status:string;
    patient: Patient;
    color : string;
    occupation: Occupation[]
    constructor(){}
    // constructor(id: number, name: string,status:string){
    //     this.id = id,
    //     this.name=name,
    //     this.status = status 
    // }
}