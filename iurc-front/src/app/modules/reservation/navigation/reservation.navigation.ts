import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const RESERVTION_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'reservation',
        route: "reservation",
        iconName: "dashboard",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'Liste',
                route: "list",
                iconName: "list",
                  requiredRole: "Admin",
            },
           /* {
                id: navigationUid(),
                displayName: 'Ajouter',
                route: "add",
                iconName: "add",
                //  requiredRole: "test",
            },*/
        ]
    }
];