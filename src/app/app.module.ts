import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { routing } from './app.routing';

import {NavigationService} from './services/navigation/navigation.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

import {Serial} from './pipes/serial/serial';

import { AppComponent } from './app.component';
import { SchemasListComponent } from './schemas-list/schemas-list.component';
import {SchemaDetailsComponent } from './schema-details/schema-details.component';
import { SchemaDescriptionComponent } from './schema-description/schema-description.component';
import { PgService } from './services/pg-service/pg-service';
import { TableDetailsComponent } from './table-details/table-details.component';
import { TypeDetailsComponent } from './type-details/type-details.component';
import { EnumDetailsComponent } from './enum-details/enum-details.component';
import { FunctionDetailsComponent } from './function-details/function-details.component';
import { MarkdownComponent } from './markdown/markdown.component';

import {Media} from 'ng2-material';

@NgModule({
  declarations: [
    AppComponent,
    SchemaDescriptionComponent,
    SchemaDetailsComponent,
    SchemasListComponent,
    TableDetailsComponent,
    TypeDetailsComponent,
    EnumDetailsComponent,
    FunctionDetailsComponent,
    MarkdownComponent,
    Serial
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [PgService, 
              NavigationService,
              LocalStorageService,
              Media],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
