import { NavItem } from "../../ngrx/app-state/models/nav-item.model"
import * as _ from 'lodash';

export function navigationUid() {
    return new Date().getUTCMilliseconds() + (Math.random() * 50)
}

export function getParsedRootNavItem(navItems: NavItem[], id: number, navItemsToInsert: NavItem[]): NavItem {
    let result: NavItem[];
    for (let i = 0; i < navItems.length; i++) {
        const nv = navItems[i];
        result = getNavItem(nv, id)
        if (result.find(ni => ni.id == id)) {
            break;
        };
    }
    result.reverse();
    let clonedNv = _.cloneDeep(result[0]);
    let existingChildren = clonedNv.children ? clonedNv.children : [];
    clonedNv.children = [...existingChildren, ...navItemsToInsert];
    result[0] = clonedNv;
    for (let i = 1; i < result.length; i++) {
        const childnv = result[i - 1];
        let itsParent = _.cloneDeep(result[i]);
        const childIndex = itsParent.children.findIndex(nv => nv.id === childnv.id);
        itsParent.children[childIndex] = childnv;
        result[i] = itsParent;
    }
    return result[result.length - 1];
}

function getNavItem(navItem: NavItem, id: number) {
    let result = [];
    if (!navItem || typeof navItem !== 'object' || !navItem.id) result = null;
    else if (navItem.id === id) result.push(navItem)
    else if (navItem.children && navItem.children.length > 0) {
        result.push(navItem)
        navItem.children.forEach(
            nvc => {
                result = [...result, ...getNavItem(nvc, id)];
            }
        )
    }
    return result
}

// export function filterByRoles(navItems: NavItem[], roles: string[]) : NavItem[] {
//     let navItemsToRegister: NavItem[] = 
//     navItems.filter(res=> {
//         if(localStorage.getItem('roles') === 'User' && res.route !== 'filiere' && res.route !== 'patient') {
            
//             return true
            
//         }else if(localStorage.getItem('roles') === 'Admin'){
//             return true
//         }
//        // this.router.navigate(['/']);
//         return false;
//     })
//     navItemsToRegister = navItemsToRegister.map(nv => filterChildrenByRoles(nv, roles));
//     // console.log(navItemsToRegister)
//     return navItemsToRegister;
// }
export function filterByRoles(navItems: NavItem[], roles: string[]) : NavItem[] {
    let navItemsToRegister: NavItem[] = navItems.filter(nv => nv.requiredRole ? roles.includes(nv.requiredRole) : true);
    navItemsToRegister = navItemsToRegister.map(nv => filterChildrenByRoles(nv, roles));
    return navItemsToRegister;
}


function filterChildrenByRoles(navItem: NavItem, roles: string[]): NavItem {
    let clonedNavItem : NavItem = _.cloneDeep(navItem);
    if (clonedNavItem.children && clonedNavItem.children.length > 0) {
        clonedNavItem.children = clonedNavItem.children.filter(nv => {
            if (nv.children && nv.children.length > 0) {
                nv.children = nv.children.map(cnv => filterChildrenByRoles(cnv, roles))
            }
            return nv.requiredRole ? roles.includes(nv.requiredRole) : true
        });
    }
    return clonedNavItem;
}