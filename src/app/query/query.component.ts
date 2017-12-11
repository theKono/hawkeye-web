import { Component, OnInit } from '@angular/core';
import { QueryService, Filter } from './query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [QueryService]
})
export class QueryComponent implements OnInit {

  begin_at: string;
  interval: number;
  end_at: string;
  fields: string[];
  selectedFields: string[];
  filterOptions: string[];
  filters: Filter[];
  link: string;
  loading = false;
  error = false;

  constructor(private service: QueryService) { }

  ngOnInit() {
    this.begin_at = '2016-09-15T08:00';
    this.end_at = '2016-09-16T08:00';
    this.interval = 10800;
    this.fields = [
      'user_properties.birthday',
      'user_properties.acquisition_channel',
      'user_properties.gender',
      'user_properties.type',
      'language',
      'ip_address',
      'platform',
      'device_family',
      'device_carrier',
      'city',
      'session_id',
      'amplitude_id',
      'anonymous',
      'user_id',
      'country',
      'event_type'
    ];
    this.selectedFields = [];
    this.filterOptions = Filter.availableFields;
    this.filters = [];
    this.add('user_id');
    this.add('event_type');
  }

  submit(): void {
    this.loading = true;
    this.error = false;
    this.link = null;
    this.service.query(this.begin_at, this.end_at, this.selectedFields, this.filters).subscribe(res => {
      this.link = res;
      this.loading = false;
      console.log(this.link);
    }, err => {
      this.error = true;
      this.loading = false;
    });
  }

  add(element: string): void {
    this.selectedFields.push(element);
    this.fields.splice(this.fields.indexOf(element), 1);
  }

  remove(element: string): void {
    this.fields.push(element);
    this.selectedFields.splice(this.selectedFields.indexOf(element), 1);
  }

  addFilter(): void {
    this.filters.push(new Filter('user_id', ''));
  }

  removeFilter(filter: Filter): void {
    this.filters.splice(this.filters.indexOf(filter), 1);
  }

  setEndAt(days: number): void {
    const d = new Date(this.begin_at);
    const offset = d.getTimezoneOffset() / 60;
    const end_date = new Date(d.getTime() + days * 86400000 - offset * 3600000);
    this.end_at = end_date.toISOString().substring(0, 16);
  }

}
