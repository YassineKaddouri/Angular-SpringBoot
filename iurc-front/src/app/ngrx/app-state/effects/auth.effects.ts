import { AuthService } from './../services/auth/auth.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { AuthApiActions, AuthPageActions } from '../actions/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private authService: AuthService, private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.login),
      switchMap((action) => this.authService.login(action.loginRequest).pipe(
        map(loginResponse => {
          const bearerToken = `Bearer ${loginResponse.access_token}`;
          loginResponse.bearerToken = bearerToken;
           console.log(loginResponse);
          localStorage.setItem('token', bearerToken);
          localStorage.setItem('username',loginResponse.username);
          localStorage.setItem('name',loginResponse.name);
          localStorage.setItem('roles',AuthService.getDecodedAccessToken(loginResponse.access_token).roles);
          loginResponse.roles=AuthService.getDecodedAccessToken(loginResponse.access_token).roles;
          console.log(loginResponse.name);
         this.router.navigateByUrl('/profile/show');
    
        this.matSnackBar.open("Authentification terminée avec succès", "Fermer", {
                        duration: 6000,
                    });
          return AuthApiActions.loginSuccess({ loginResponse: loginResponse })
        }),
        
        catchError(error => {
          this.matSnackBar.open("Echec lors de l'authentification", "Fermer", {
                        duration: 6000,
                    });
          return of(AuthApiActions.loginFailure({ error }));
        })
      ))
    )
  })

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthPageActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }),
      map(() =>AuthApiActions.logoutSuccess({ successLogout: true }))
    )
  );

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.signup),
      switchMap((action) => this.authService.signup(action.signupRequest).pipe(
        map(signupResponse => {
            console.log(signupResponse)
        //this.router.navigateByUrl('/login');
        window.location.reload(); 
         this.matSnackBar.open("Compte créé avec succès", "Fermer", {
                        duration: 6000,
                    });
          return AuthApiActions.signupSuccess({ signupResponse: signupResponse })
        }),
        catchError(error => {
          console.log(error.error.message);
          if(error.error.message=="Username Taken"){
          this.matSnackBar.open("Utilisateur existe déjà", "Fermer", {
                        duration: 6000,
                    });
                  }
          return of(AuthApiActions.signupFailure({ error }));
        })
      ))
    )
  })
}
