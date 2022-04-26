import { User } from'../../models/user.model';
import { LoginResponse } from '../../models/login-response.model';
import { createAction, props } from "@ngrx/store";

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ loginResponse: LoginResponse }>()
);

export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ error: Error }>()
);

export const signupSuccess = createAction(
    '[Auth API] SignUp Success',
    props<{ signupResponse: any }>()
);

export const signupFailure = createAction(
    '[Auth API] SignUp Failure',
    props<{ error: Error }>()
);

export const logoutSuccess = createAction(
    '[Auth API] Logout Success',
    props<{ successLogout: boolean }>()
);

export const logoutFailure = createAction(
    '[Auth API] Logout Failure',
    props<{ error: Error }>()
);