import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

declare var PgProc: any;

@Injectable()
export class PgService {
  token: string;
  path = 'http://localhost/pg';

  constructor(private http: Http) {}

  pgcall(schema: string, method: string, args: any = {}) {
    return new Promise((resolve, reject) => {
      var url = this.path + '/' + schema + '/' + method;
      this.http.post(url, JSON.stringify(args))
          .subscribe(
              data => {
                resolve(data.json());
              },
              err => {
                console.log('reject');
                reject(err);
              },
              () => { console.log('else'); });
    });
  }
}