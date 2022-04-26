import { Direction } from '@angular/cdk/bidi';
import { HttpErrorResponse } from '@angular/common/http';
import { NavItem } from '../models/nav-item.model';
import { User } from './../models/user.model';
export interface AppState {
    user: User;
    token: string;
    isLoggedIn: boolean;
    direction: Direction;
    error: Error | HttpErrorResponse;
    userCreated : boolean;
    navigation: NavItem[];
}

export const initialState: AppState = {
    user : null ,
    token: null ,
    isLoggedIn: false,
    direction: 'ltr',
    error: null ,
    userCreated:false,
    navigation:[],
};