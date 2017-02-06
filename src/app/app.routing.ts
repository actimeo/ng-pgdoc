import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {SchemasListComponent} from './schemas-list/schemas-list.component';
import {SchemaDetailsComponent} from './schema-details/schema-details.component';
import {SchemaDescriptionComponent} from './schema-description/schema-description.component';


import {TableDetailsComponent} from './table-details/table-details.component';
import {TypeDetailsComponent} from './type-details/type-details.component';
import {EnumDetailsComponent} from './enum-details/enum-details.component';
import {FunctionDetailsComponent} from './function-details/function-details.component';


const appRoutes: Routes = [
    {
        path: '', pathMatch: 'full',
        redirectTo: ''
    },
    { path: 'schema/:id',
    children: [
        { 
            path : '',
            component: SchemaDescriptionComponent
        }, {
            path: '',
            outlet: 'menu',
            component: SchemasListComponent
        }
        
    ] 
    },
    { path: 'table/:schema/:id', component: TableDetailsComponent },
    { path: 'type/:schema/:id', component: TypeDetailsComponent },
    { path: 'enum/:schema/:id', component: EnumDetailsComponent },
    { path: 'function/:schema/:id', component: FunctionDetailsComponent }
];

export const routing = RouterModule.forRoot(appRoutes,
    { preloadingStrategy: PreloadAllModules });