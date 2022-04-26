import { AppState } from './../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

const getAppFeatureState = createFeatureSelector<AppState>('appState');

export const getIsLoggedIn = createSelector(
    getAppFeatureState,
    state => state.isLoggedIn
)

export const getError = createSelector(
    getAppFeatureState,
    state => state.error
)

export const getUser = createSelector(
    getAppFeatureState,
    state => state.user
)

export const getToken = createSelector(
    getAppFeatureState,
    state => state.token
)

export const getNavigation = createSelector(
    getAppFeatureState,
    state => state.navigation
)

export const getRoles = createSelector(
    getAppFeatureState,
    state => state.user && state.user.roles ? state.user.roles : null
)

export const getDirection = createSelector(
    getAppFeatureState,
    state => state.direction
)
