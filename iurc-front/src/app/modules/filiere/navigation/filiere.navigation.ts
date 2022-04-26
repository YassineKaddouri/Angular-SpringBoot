import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const FILIERE_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'Filière',
        route: "filiere",
        iconName: "assignment_turned_in",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'Liste',
                route: "list",
                iconName: "list",
                //  requiredRole: "test",
            },
            {
                id: navigationUid(),
                displayName: 'Affectation des filières',
                route: "addFiliereToSite",
                iconName: "add",
                //  requiredRole: "test",
            },
        ]
    }
];