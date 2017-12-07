import { Component, OnInit } from '@angular/core';
import { QueryService } from './query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss'],
  providers: [QueryService]
})
export class QueryComponent implements OnInit {

  begin_at: string;
  interval: number;
  fields: string[];
  selectedFields: string[];
  link: string;
  loading = false;

  constructor(private service: QueryService) { }

  ngOnInit() {
    this.begin_at = '2016-09-01T08:00';
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
      'device_carrier'
    ];
    this.selectedFields = ['user_id', 'country', 'city', 'event_type']
  }

  submit(): void {
    this.service.query(this.begin_at, this.interval, this.selectedFields).subscribe(res => {
      this.link = res;
      console.log(this.link)
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

}
