import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SchemasListComponent } from './schemas-list/schemas-list.component';
import { SchemaDetailsComponent } from './schema-details/schema-details.component';
import { SchemaDescriptionComponent } from './schema-description/schema-description.component';


import { TableDetailsComponent } from './table-details/table-details.component';
import { TypeDetailsComponent } from './type-details/type-details.component';
import { EnumDetailsComponent } from './enum-details/enum-details.component';
import { FunctionDetailsComponent } from './function-details/function-details.component';


const appRoutes: Routes = [
    {
        path: '', pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: ':schema',
        children: [
            {
                path: '',
                component: SchemaDescriptionComponent
            }, {
                path: '',
                outlet: 'menu',
                component: SchemasListComponent
            }

        ]
    },
    {
        path: ':schema/table/:id',
        children: [
            {
                path: '',
                component: TableDetailsComponent
            }, {
                path: '',
                outlet: 'menu',
                component: SchemasListComponent
            }
        ]
    },
    {
        path: ':schema/type/:id',
        children: [
            {
                path: '',
                component: TypeDetailsComponent
            }, {
                path: '',
                outlet: 'menu',
                component: SchemasListComponent
            }
        ]
    },
    {
        path: ':schema/enum/:id',
        children: [
            {
                path: '',
                component: EnumDetailsComponent
            }, {
                path: '',
                outlet: 'menu',
                component: SchemasListComponent
            }
        ]
    },
    {
        path: ':schema/function/:id',
        children: [
            {
                path: '',
                component: FunctionDetailsComponent
            }, {
                path: '',
                outlet: 'menu',
                component: SchemasListComponent
            }
        ]
    }

];

export const routing = RouterModule.forRoot(appRoutes,
    { preloadingStrategy: PreloadAllModules });