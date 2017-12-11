import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import { Router } from '@angular/router';

@Injectable()
export class QueryService {

  private url = `${environment.apiUrl}/hawkeye_es/respond_all`;

  constructor(private http: HttpClient, private router: Router) { }

  query(begin_at: string, end_at: string, fields: string[], filters: Filter[]): Observable<string> {
    const q = new Query(begin_at, end_at, fields, filters);
    const query = q.to_json();

    return this.http.post(this.url, { query: query }).pipe(
      map(res => `${environment.apiUrl}/${res['link']}`),
      catchError(err => {
        console.log(err);
        return new Observable<string>(oberver => oberver.error(err));
      })
    );
  }
}

export class Filter {

  static availableFields = [
    'user_id', 'country', 'city', 'event_type', 'user_properties.gender',
    'user_properties.type', 'platform', 'language', 'session_id', 'amplitude_id',
    'anonymous'
  ];

  field: string;
  values: string;

  constructor(field: string, values: string) {
    this.field = field;
    this.values = values;
  }

  getValues(): string[] {
    return this.values.split(',').map(v => v.trim());
  }
}

class Query {
  begin_at: number;
  end_at: number;
  fields: string[];
  filters: Filter[];

  constructor(begin_at: string, end_at: string, fields: string[], filters: Filter[]) {
    this.begin_at = (new Date(begin_at).getTime()) / 1000;
    this.end_at = (new Date(end_at).getTime()) / 1000;
    this.fields = fields.concat('happened_at');
    this.filters = filters;
  }

  to_json(): object {
    const must = [];
    must.push({ 'range': { 'happened_at': { 'gte': this.begin_at, 'lt': this.end_at } } });
    this.filters.forEach(filter => {
      must.push(this.parseFilter(filter));
    });
    return {
      '_source': this.fields,
      'query': {
        'bool': {
          'must': must
        }
      }
    };
  }

  parseFilter(filter: Filter): object {
    const obj = {};
    obj['term'] = {}
    obj['term'][filter.field] = filter.values;
    return obj;
  }
}
