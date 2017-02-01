import {Component, Output, EventEmitter, OnInit} from '@angular/core';

import {PgService} from '../services/pg-service/pg-service';

@Component({
  selector: 'pr-schemas-list',
  templateUrl: './schemas-list.component.html',
  styleUrls: ['./schemas-list.component.css']
})
export class SchemasListComponent implements OnInit {
 private schemas;

  @Output() onselected: EventEmitter<string> = new EventEmitter();

  constructor(private pgService: PgService) { }

  ngOnInit() {
    this.pgService.pgcall('pgdoc', 'list_schemas', { 'prm_ignore': ['pg%', 'information_schema'] })
      .then(data => {
        this.schemas = data;
      });
  }

  onSelectChange(event) { this.onselected.emit(event.target.value); }
}