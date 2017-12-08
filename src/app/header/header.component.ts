import { Component, OnInit } from '@angular/core';
import { User } from '../login/user';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    this.service.getUser().subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.service.logout();
  }

}
