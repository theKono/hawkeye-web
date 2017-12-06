import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  private account: string;
  private validator: string;
  private authenticated = true;
  private remember = false;
  private user: Observable<User>;

  constructor(
    private service: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    if (loginData) {
      this.account = loginData.account;
      this.validator = loginData.validator;
      this.remember = loginData.remember;
    }

    this.user = this.service.getUser();
    this.user.subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      }
    });
  }

  login(): void {
    localStorage.removeItem('loginData');

    if (this.remember) {
      const loginData = JSON.stringify({
        account: this.account, validator: this.validator, remember: this.remember
      });
      localStorage.setItem('loginData', loginData);
    }

    if (this.account && this.validator) {
      this.service.login(this.account, this.validator).subscribe(res => {
        this.authenticated = res;
      });
    }
  }

}
