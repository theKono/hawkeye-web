import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {

  private static service: AuthenticationService;
  private url = `${environment.apiUrl}/users/login`;
  private user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
    this.user.next(JSON.parse(localStorage.getItem('currentUser')));
    return AuthenticationService.service = AuthenticationService.service || this;
  }

  login(account: string, validator: string): Observable<boolean> {
    const body = {account: account, validator: validator};
    // return this.http.post<User>(this.url, body);

    if (body.account === 'matthew.yang@thekono.com' && body.validator === 'qwert') {
      const user = new User();
      user.account = account;
      user.nickname = 'Matthew';
      this.user.next(user);
      return new Observable(observer => observer.next(true));
    } else {
      this.user.next(null);
      return new Observable(observer => observer.next(false));
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.user.next(null);
  }

  getUser(): Observable<User> {
    return this.user.asObservable();
  }

}
