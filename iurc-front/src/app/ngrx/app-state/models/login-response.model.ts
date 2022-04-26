import { User } from "./user.model";

export interface LoginResponse{
    ID: number;
    message: string;
    username: string;
    name: string;
    image: string;
    //firstname:string;
    //lastname:string;
    //email:string;
  
    access_token: string;
    refresh_token: string;
    bearerToken : string;
    roles:string[];
    //dob:string;
}