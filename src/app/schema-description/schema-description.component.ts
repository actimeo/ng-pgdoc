import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
//import {MATERIAL_DIRECTIVES} from 'ng2-material';

import {PgService} from '../services/pg-service/pg-service';
import {NavigationService} from '../services/navigation/navigation.service';
import {MarkdownComponent} from '../markdown/markdown.component';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Component({
  selector: 'pr-schema-description',
  templateUrl: './schema-description.component.html',
  styleUrls: ['./schema-description.component.css']
})
export class SchemaDescriptionComponent implements OnInit {

  schema: string;

  description: any;
  private olddescription;
  private editing = false;
  private displayOriginal: boolean = false;

  constructor(private _routeParams: ActivatedRoute, private pgService: PgService, private nav: NavigationService,
    private locStore: LocalStorageService) {
    this._routeParams.params.subscribe(params => {
        this.schema = params['schema'];
        this.nav.currentTitle = 'Schema ' + this.schema;
        if (!this.reloadLocalData()) {
          this.reloadData();
        }
    });
  }

  ngOnInit() {
    if (!this.reloadLocalData()) {
      this.reloadData();
    }
  }

  reloadLocalData() {
    this.description = this.locStore.getSchemaDescription(this.schema);
    return this.description;
  }

  reloadData() {
    this.pgService.pgcall('pgdoc', 'schema_description', { prm_schema: this.schema }).then(data => {
      this.description = data;
    });
  }

  startEdit() {
    this.editing = true;
    this.olddescription = this.description;
  }
  save() {
    this.editing = false;
    // save description to local
    this.locStore.setSchemaDescription(this.schema, this.description);
  }
  cancel() {
    this.editing = false;
    this.description = this.olddescription;
  }
  reset() {
    // clear description saved in local
    this.locStore.removeSchemaDescription(this.schema);
    this.reloadData();
  }

  isModified() {
    return this.locStore.schemaDescriptionExists(this.schema);
  }

  onDisplayOriginalChange(cbstate) {
    this.displayOriginal = cbstate;
    if (cbstate) {
      this.reloadData();
    } else {
      this.reloadLocalData();
    }
  }
}
