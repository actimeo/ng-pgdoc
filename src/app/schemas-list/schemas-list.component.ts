import {Component, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {PgService} from '../services/pg-service/pg-service';

@Component({
  selector: 'pr-schemas-list',
  templateUrl: './schemas-list.component.html',
  styleUrls: ['./schemas-list.component.css']
})
export class SchemasListComponent implements OnInit {
 private schemas;
 private id;
 private schema;
 @ViewChild('schemaDetails') schemaDetails;
  constructor(private pgService: PgService, private _routeParams: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    this.pgService.pgcall('pgdoc', 'list_schemas', { 'prm_ignore': ['pg%', 'information_schema'] })
      .then(data => {
        this.schemas = data;
        console.log(data);
      });
      
      this._routeParams.params.subscribe(params => {
        this.id = params['id'];
        console.log(this.id);
        this.schemaSelected(this.id);
    });
  }

  onSelectChange(name) { this.router.navigate(['schema/', name]); }
  schemaSelected(event) { this.schemaDetails.setSchema(event); }
}