import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { User } from './user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  private url: string = `${environment.apiUrl}/users/login`;

  constructor(private http: HttpClient) { }

  login(account: string, validator: string): Observable<User> {
    const body = {account: account, validator: validator};
    // return this.http.post<User>(this.url, body);

    if (body.account == 'matthew.yang@thekono.com' && body.validator == 'qwert') {
      return new Observable(observer => {
        let user = new User();
        user.account = account;
        user.nickname = 'matthew';
        observer.next(user)
      });
    } else {
      return new Observable(obserbver => obserbver.next(null));
    }
  }

}
