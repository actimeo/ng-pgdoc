import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';
import {NavigationService} from '../services/navigation/navigation.service';
import {MarkdownComponent} from '../markdown/markdown.component';

@Component({
  selector: 'pr-type-details',
  styleUrls: ['./type-details.component.css'],
  templateUrl: './type-details.component.html'
})
export class TypeDetailsComponent {
  schema: string;
  id: string;

  description: any;
  columns: any;
  functionsReturningType: any;

  constructor(private _routeParams: ActivatedRoute, private pgService: PgService, private nav: NavigationService) {
    
    this._routeParams.params.subscribe(params => {
        this.schema = params['schema'];
        this.id = params['id'];
        this.nav.currentTitle = 'Type ' + this.schema + '.' + this.id;
        this.reloadData();
    });
  }

  ngOnInit() { this.reloadData(); }

  reloadData() {
    this.pgService.pgcall('pgdoc', 'type_description', {prm_schema: this.schema, prm_type: this.id})
        .then((data: string) => { this.description = data.length > 0 ? data : null; });

    this.pgService.pgcall('pgdoc', 'type_columns', {prm_schema: this.schema, prm_type: this.id})
        .then(data => { this.columns = data; });

    this.pgService
        .pgcall('pgdoc', 'functions_returning_type', {prm_schema: this.schema, prm_type: this.id})
        .then(data => { this.functionsReturningType = data; });
  }
}