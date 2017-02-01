import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';
import {NavigationService} from '../services/navigation/navigation.service';
import {MarkdownComponent} from '../markdown/markdown.component';
import {Serial} from '../pipes/serial/serial';

@Component({
  selector: 'pr-table-details',
  templateUrl: './table-details.component.html',
  styleUrls: ['./table-details.component.css']
})
export class TableDetailsComponent {
  schema: string;
  id: string;

  description: any;
  columns: any;

  constructor(private _routeParams: ActivatedRoute, private pgService: PgService, private nav: NavigationService) {
    
    this._routeParams.params.subscribe(params => {
        this.schema = params['schema'];
        this.id = params['id'];
        this.nav.currentTitle = 'Table ' + this.schema + '.' + this.id;
        this.reloadData();
    });
  }

  ngOnInit() { this.reloadData(); }

  reloadData() {
    this.pgService
      .pgcall('pgdoc', 'table_description', { prm_schema: this.schema, prm_table: this.id })
      .then((data: string) => { this.description = data.length > 0 ? data : null; });

    this.pgService.pgcall('pgdoc', 'table_columns', { prm_schema: this.schema, prm_table: this.id })
      .then(data => { this.columns = data; });
  }
}