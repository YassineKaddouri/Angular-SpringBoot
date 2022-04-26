import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const SITE_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'site',
        route: "site",
        iconName: "domain",
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