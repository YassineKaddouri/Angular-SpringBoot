import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSiteComponent } from './create-site/create-site.component';
import { FiliereToSiteComponent } from './filiere-to-site/filiere-to-site.component';
import { SiteListComponent } from './site-list/site-list.component';



const routes: Routes = [

    {
        path: "add",
        component : CreateSiteComponent
    },
    {
        path: "list",
        component : SiteListComponent
    },
     { 
        path: 'addFiliereToSite',
        component : FiliereToSiteComponent
    }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
