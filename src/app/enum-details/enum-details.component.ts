import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';
import {NavigationService} from '../services/navigation/navigation.service';
import {MarkdownComponent} from '../markdown/markdown.component';


@Component({
  selector: 'pr-enum-details',
  templateUrl: './enum-details.component.html',
  styleUrls: ['./enum-details.component.css']
})
export class EnumDetailsComponent implements OnInit {

  schema: string;
  id: string;

  description: any;
  values: any;

  constructor(private _routeParams: ActivatedRoute, private pgService: PgService, private nav: NavigationService) {
    
    this._routeParams.params.subscribe(params => {
        this.schema = params['schema'];
        this.id = params['id'];
        this.nav.currentTitle = 'Enum ' + this.schema + '.' + this.id;
        this.reloadData();
    });
  }

  ngOnInit() { this.reloadData(); }

  reloadData() {
    this.pgService.pgcall('pgdoc', 'enum_description', {prm_schema: this.schema, prm_enum: this.id})
        .then((data: string) => {
          this.description = data.length > 0 ? data : null;
         });

    this.pgService.pgcall('pgdoc', 'enum_values', {prm_schema: this.schema, prm_enum: this.id})
        .then(data => { this.values = data; });
  }

}

