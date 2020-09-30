import { Component } from '@angular/core';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JWT-Authentication-Angular';
  constructor(private _auth: AuthenticationService) {
    let user = localStorage.getItem('user')
    if (typeof user !== 'undefined' && user !== null && _auth.userValue == null) {
      _auth.userSubject.next(JSON.parse(user));
    }
  }
}