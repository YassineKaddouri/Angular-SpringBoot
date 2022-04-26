import { createAction, props } from "@ngrx/store";
import { NavItem } from "../../models/nav-item.model";

export const registerNavigation = createAction(
    '[Navigation PAGE] Register Navigation',
    props<{ navItems: NavItem[], parent?: number }>()
);

export const clearNavigation = createAction(
    '[Navigation PAGE] Clear Navigation'
);