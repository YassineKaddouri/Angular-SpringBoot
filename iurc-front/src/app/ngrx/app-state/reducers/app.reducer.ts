import { AppState, initialState } from './../state/app.state';
import { Action, ActionCreator, ActionReducer, ActionType, createReducer, on, ReducerTypes } from '@ngrx/store';
import { AuthApiActions, AuthPageActions } from '../actions/auth';
import { AuthService } from '../services/auth/auth.service';
import * as _ from 'lodash';
import { NavigationPageActions } from '../actions/navigation';
import { NavItem } from '../models/nav-item.model';
import { filterByRoles, getParsedRootNavItem } from 'src/app/shared/utils/navigation.utils';







export const appReducer = createRehydrateReducer<AppState>("nj",initialState,
  on(AuthApiActions.loginSuccess, (state, action): AppState => {
    
    // let user = _.cloneDeep(action.loginResponse);

    let user={
      id: _.cloneDeep(action.loginResponse.ID),
      username:_.cloneDeep(action.loginResponse.username),
      name:_.cloneDeep(action.loginResponse.name),
      image:_.cloneDeep(action.loginResponse.image),
      //firstname:_.cloneDeep(action.loginResponse.firstname),
      //lastname:_.cloneDeep(action.loginResponse.lastname),
      //email:_.cloneDeep(action.loginResponse.email),
      roles:_.cloneDeep(action.loginResponse.roles),
      //dob:_.cloneDeep(action.loginResponse.dob)
    }
console.log(user.image)
    // console.log(user.email);
    // user.roles = [...user.roles, ...roles];
    // let limitation: Limitation = {};
    // for (const key in action.loginResponse) {
    //   if (key.includes('limitCount')) {
    //     limitation[key] = action.loginResponse[key];
    //   }
    // }
    // AuthService.saveEncodedLimitation(limitation);
    return {
      ...state,
      user: { ...state.user, ...user },
      token: action.loginResponse.bearerToken,
      isLoggedIn: true
    }
  }),
  on(AuthApiActions.loginFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
      isLoggedIn: false
    }
  }),
  on(AuthApiActions.logoutSuccess, (state, action): AppState => {
    return {
      ...state,
      user: null as any,
      token: null as any,
      isLoggedIn: false
    }
  }),
    on(AuthPageActions.initToken, (state, action): AppState => {
    let user = AuthService.getUser();
    if (user) {
      user.roles = [...user.roles];
    }
    return {
      ...state,
      token: AuthService.getToken(),
      user: { ...state.user, ...user },
      isLoggedIn: AuthService.getIsLoggedIn(),
    }
  }),
  on(AuthApiActions.signupSuccess, (state, action): AppState => {
    return {
      ...state,
   
      userCreated:true,
    }
  }),
  on(AuthApiActions.signupFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error,
      userCreated:false,
    }
  }),
  on(NavigationPageActions.registerNavigation, (state, action): AppState => {
    let navigation = [];
    if (state.user && state.user.roles) {
      // console.log(state.user.roles)
      let navItemsToRegister: NavItem[] = filterByRoles(action.navItems, state.user.roles);
     if (action.parent && !isNaN(action.parent)) {
       console.log(1)
        let parsedRootNavItem = getParsedRootNavItem(state.navigation, action.parent, navItemsToRegister);
        const rootNavItemIndex = state.navigation.findIndex(nv => nv.id == parsedRootNavItem.id);
        navigation = state.navigation.map((nv, i) => i == rootNavItemIndex ? parsedRootNavItem : nv);
      } else {
        navigation = [...state.navigation, ...navItemsToRegister];
      }
      
    }
    return {
      ...state,
      navigation: navigation
    }
  }),
  on(NavigationPageActions.clearNavigation, (state, action): AppState => {
    return {
      ...state,
      navigation: [],
    }
  })
);



export function createRehydrateReducer<S, A extends Action = Action>(
  key: string,
  initialState: S,
  ...ons: ReducerTypes<S, ActionCreator[]>[]
): ActionReducer<S, A> {
  const item = localStorage.getItem(key);
  const newInitialState =
    (item && JSON.parse(item)) ?? initialState;

  const newOns: ReducerTypes<S, ActionCreator[]>[] = [];
  ons.forEach((oldOn: ReducerTypes<S, ActionCreator[]>) => {
    const newReducer: ActionReducer<S, A> = (
      state: S | undefined,
      action: ActionType<ActionCreator[][number]>
    ) => {
      const newState = oldOn.reducer(state, action);
      localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    };
    newOns.push({ ...oldOn, reducer: newReducer });
  });
  return createReducer(newInitialState, ...newOns);
}