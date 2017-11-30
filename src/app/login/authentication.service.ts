import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(account: string, validatot: string): Observable<boolean> {
    return new Observable(observer => observer.next(false));
  }

}
