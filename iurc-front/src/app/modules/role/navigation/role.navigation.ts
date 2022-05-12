import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const ROLE_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'role',
        route: "role",
        iconName: "person",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'Liste Role',
                route: "list",
                iconName: "list",
                 // requiredRole: "Admin",
            },
            {
                id: navigationUid(),
                displayName: 'Liste User',
                route: "list user",
                iconName: "list",
                 // requiredRole: "Admin",
            },
            {
                id: navigationUid(),
                displayName: 'Liste Email',
                route: "list email",
                iconName: "list",
                 // requiredRole: "Admin",
            },
           
           
            {
                id: navigationUid(),
                displayName: 'Affectation to RoleUser',
                route: "addRoleToUser",
                iconName: "add",
                 // requiredRole: "Admin",
            },
        ]
    }
];