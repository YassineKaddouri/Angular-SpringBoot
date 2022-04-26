import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const CHECKPOINTS_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'TEST',
        route: "test",
        iconName: "assignment_turned_in",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'TEST',
                route: "list",
                iconName: "list",
                 requiredRole: "test",
            },
            {
                id: navigationUid(),
                displayName: 'TEST',
                route: "add",
                iconName: "add",
                 requiredRole: "test",
            },
        ]
    }
];