export interface NavItem {
    id?: number; // unique identifier
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    prefixes?: string[];
    hasChildren?: boolean;
    children?: NavItem[];
    requiredRole?: string;
}