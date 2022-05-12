import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AuthLinks {
    public readonly LOGIN_LINK = "http://localhost:8080/iurc/login";
    public readonly SIGNUP_LINK = "http://localhost:8080/iurc/user/save";
   public readonly GET_LISTUSER_LINK = "http://localhost:8080/iurc/users"; 
   public readonly ROLE_USER_ADD_LINK = "http://localhost:8080/iurc/role/addToUser";
   public readonly DELETE_USER_LINK = "http://localhost:8080/iurc/users"; 
}



