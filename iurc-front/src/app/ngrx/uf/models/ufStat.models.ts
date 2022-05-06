import { Occupation } from "./occupation.models";

export class UfState{
    id: number;
    idFiliere : number;
    idReservation: any[];
    listPatient: any[];
    name: string;
    status:string;
    color : string;
    occupation: Occupation[]
    dateDebut : Date;
    dateFin : Date;
    patient : any;
    constructor(){}
    // constructor(id: number, name: string,status:string){
    //     this.id = id,
    //     this.name=name,
    //     this.status = status 
    // }
}