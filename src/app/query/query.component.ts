import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  timeRange: string;
  fields: string[];
  selectedFields: string[];

  constructor() { }

  ngOnInit() {
    this.fields = ['aaa', 'bbb', 'xxx', 'yyy'];
    this.selectedFields = ['user_id', 'country', 'city']
  }

  submit(): void {
    console.log(this.timeRange);
    console.log(this.selectedFields);
    console.log(this.fields);
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
