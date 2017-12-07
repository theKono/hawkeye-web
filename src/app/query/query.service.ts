import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class QueryService {

  private url = `${environment.apiUrl}/hawkeye_es/respond_all`;

  constructor(private http: HttpClient) { }

  query(begin_at: string, interval: number, fields: string[]): Observable<string> {
    const q = new Query(begin_at, interval, fields);
    const query = q.to_json();
    return this.http.post(this.url, { query: query }).pipe(
      map(res => `${environment.apiUrl}/${res['link']}`)
    );
    // return new Observable(observer => {
    //   observer.next(`${environment.apiUrl}/${q.begin_at}/${q.end_at}/${q.fields.length}`);
    // });
  }
}

class Query {
  begin_at: number;
  end_at: number;
  fields: string[];

  constructor(begin_at: string, interval: number, fields: string[]) {
    this.begin_at = (new Date(begin_at).getTime())/1000;
    this.end_at = this.begin_at + interval;
    this.fields = fields;
  }

  to_json(): object {
    return {
      "_source": this.fields,
      "query": {
        "bool": {
          "must": [
            {"range": { "happened_at": { "gte": this.begin_at, "lt": this.end_at } }},
            {"term": { "user_id": 2342 }}
          ]
        }
      }
    }
  }
}
