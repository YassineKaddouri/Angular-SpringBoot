import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const UF_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'uf',
        route: "uf",
        iconName: "airline_seat_individual_suite",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'Liste',
                route: "list",
                iconName: "list",
                //  requiredRole: "test",
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