import { NavItem } from "src/app/ngrx/app-state/models/nav-item.model";
import { navigationUid } from "src/app/shared/utils/navigation.utils";

export const PATIENT_NAVIGATION: NavItem[] = [
    {
        id: navigationUid(),
        displayName: 'patient',
        route: "patient",
        iconName: "person",
        hasChildren: true,
        children: [
            {
                id: navigationUid(),
                displayName: 'Liste',
                route: "list",
                iconName: "list",
                  requiredRole: "infermier",
            },
            // {
            //     id: navigationUid(),
            //     displayName: 'Details',
            //     route: "patient-details/:id",
            //     iconName: "details",
            //     //  requiredRole: "test",
            // },
        ]
    }
];