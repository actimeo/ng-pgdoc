import {Component, ViewChild, Input, ApplicationRef} from '@angular/core';
import { MdSidenav } from '@angular/material';
import {PgService} from './services/pg-service/pg-service';
import {NavigationService} from './services/navigation/navigation.service';
import {LocalStorageService} from './services/local-storage/local-storage.service';

declare var saveAs;
declare var JSZip;

@Component({
  selector: 'pr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('schemaDetails') schemaDetails;
  
  constructor(public navigation: NavigationService, private pgService: PgService, private locStore: LocalStorageService){
      navigation.currentTitle = 'Variation database';
  }
  schemaSelected(event) { this.schemaDetails.setSchema(event); }
  download() {
    this.pgService
      .pgcall('pgdoc', 'comments_get_all', {
        'prm_ignore_schema': ['pg%', 'information_schema', 'public']
      })
      .then((data: any[]) => {
        var arrs = data.reduce((prev: {}, next) => {
          if (this.locStore.schemaDescriptionExists(next.name)) {
            next.comment = this.locStore.getSchemaDescription(next.name);
          }
          if (next.typ == 'schema') {
            prev[next.name] = 'COMMENT ON SCHEMA ' + next.name + ' IS \''
              + next.comment.replace(/'/g, "''") + '\';\n\n';
            return prev;
          } else if (next.typ == 'table') {
            if (next.comment) {
              prev[next.schema] += 'COMMENT ON TABLE ' + next.schema + '.' + next.name + ' IS \''
                + next.comment.replace(/'/g, "''") + '\';\n\n';
            }
            return prev;
          } else if (next.typ == 'enum' /*|| next.typ == 'type'*/) {
            if (next.comment) {
              prev[next.schema] += 'COMMENT ON TYPE ' + next.schema + '.' + next.name + ' IS \''
                + next.comment.replace(/'/g, "''") + '\';\n\n';
            }
            return prev;
          } else if (next.typ == 'column') {
            if (next.comment) {
              prev[next.schema] +=
                'COMMENT ON COLUMN ' + next.schema + '.' + next.name + '.' + next.subname + ' IS \''
                + next.comment.replace(/'/g, "''") + '\';\n\n';
            }
            return prev;
          } else {
            return prev;
          }
        }, {});

        new Promise((resolve, reject) => {
          var zip = new JSZip();
          var c = 0;
          var keys = Object.keys(arrs);
          keys.forEach(key => {
            var value = arrs[key];
            zip.file(key + '/sql/comments.sql', value);
            if (++c == keys.length) {
              resolve(zip);
            }
          });
        }).then((zip: any) => {
          zip.generateAsync({ type: 'blob' })
            .then(function (content) {
              console.log(content);
              saveAs(content, 'comments.zip');
            });
        });
      });
  }
}
