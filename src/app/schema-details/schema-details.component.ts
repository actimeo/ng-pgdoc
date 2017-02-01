import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';

@Component({
  selector: 'pr-schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.css']
  
})
export class SchemaDetailsComponent {
  schema: string;

  tables: any;
  types: any;
  enums: any;
  functions: any;

  constructor(private pgService: PgService) { this.schema = null; }

  ngOnInit() { this.reloadData(); }

  hasTables() { return this.tables != null && this.tables.length != 0; }

  hasTypes() { return this.types != null && this.types.length != 0; }

  hasEnums() { return this.enums != null && this.enums.length != 0; }

  hasFunctions() { return this.functions != null && this.functions.length != 0; }

  reloadData() {
    if (this.schema == null) {
      this.tables = null;
      this.types = null;
      this.enums = null;
      this.functions = null;
      return;
    }

    this.pgService.pgcall('pgdoc', 'schema_list_tables', {prm_schema: this.schema}).then(data => {
      this.tables = data;
    });
    this.pgService.pgcall('pgdoc', 'schema_list_types', {prm_schema: this.schema}).then(data => {
      this.types = data;
    });
    this.pgService.pgcall('pgdoc', 'schema_list_enums', {prm_schema: this.schema}).then(data => {
      this.enums = data;
    });
    this.pgService.pgcall('pgdoc', 'schema_list_functions', {prm_schema: this.schema})
        .then(data => { this.functions = data; });
  }

  setSchema(schema) {
    this.schema = schema;
    this.reloadData();
  }
}
