import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  private account: string;
  private validator: string;
  private authenticated: boolean = true;
  private remember: boolean = true;

  constructor(
    private service: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    let loginData = JSON.parse(localStorage.getItem('loginData'));
    if (loginData) {
      this.account = loginData.account;
      this.validator = loginData.validator;
    }
  }

  login(): void {
    localStorage.removeItem('loginData');

    if (this.remember) {
      let loginData = JSON.stringify({ account: this.account, validator: this.validator });
      localStorage.setItem('loginData', loginData);
    }

    if (this.account && this.validator) {
      this.service.login(this.account, this.validator).subscribe(res => {
        if (this.authenticated = res) {
          this.router.navigate(['/']);
        }
      });
    }
  }

}
