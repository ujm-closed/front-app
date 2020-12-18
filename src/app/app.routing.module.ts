import { CreateRdfComponent } from './create-rdf/create-rdf.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Defining routes
const routes: Routes = [
    //All empty url match home route
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateRdfComponent },
    // {
    //     path: 'setting', component: SettingComponent,
    //     children: [
    //         {
    //             path: '',
    //             loadChildren: './wiki-search/wiki.module#WikiModule'
    //         }
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    // { useHash: true }
    exports: [RouterModule]
})
export class AppRoutingModule { }
