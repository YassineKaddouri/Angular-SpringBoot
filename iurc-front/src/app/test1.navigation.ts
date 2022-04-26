import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const TEST_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'TESTA',
        route: "profile",
        iconName: "assignment_turned_in",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'TEST1',
                route: "show",
                iconName: "list",
                //  requiredRole: "test",
            },
            {
                id: navigationUid(),
                displayName: 'TEST1',
                route: "add",
                iconName: "add",
                //  requiredRole: "test",
            },
        ]
    }
];