import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';
import {NavigationService} from '../services/navigation/navigation.service';
import {MarkdownComponent} from '../markdown/markdown.component';

@Component({
  selector: 'pr-function-details',
  templateUrl: './function-details.component.html',
  styleUrls: ['./function-details.component.css']
})
export class FunctionDetailsComponent implements OnInit {


  schema: string;
  id: string;

  details: any;
  args: any;
  retColumns: any;

  constructor(private _routeParams: ActivatedRoute, private pgService: PgService, private nav: NavigationService) {
    
    this._routeParams.params.subscribe(params => {
        this.schema = params['schema'];
        this.id = params['id'];
        this.nav.currentTitle = 'Function ' + this.schema + '.' + this.id;
        this.reloadData();
    });
  }

  ngOnInit() { this.reloadData(); }

  reloadData() {
    this.pgService
      .pgcall('pgdoc', 'function_details', { prm_schema: this.schema, prm_function: this.id })
      .then(data => {
        this.details = data;

        this.pgService
          .pgcall(
          'pgdoc', 'type_columns',
          { prm_schema: this.details.rettype_schema, prm_type: this.details.rettype_name })
          .then(data2 => { this.retColumns = data2; });
      });

    this.pgService
      .pgcall('pgdoc', 'function_arguments', { prm_schema: this.schema, prm_function: this.id })
      .then(data => { this.args = data; });
  }
}