import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn: boolean;

  constructor(private authSer: AuthService, private router: Router) {
    this.loggedIn = this.authSer.loggedIn;
  }

  onLogIn() {
    this.router.navigate(['/login']);
  }

  onLogOut() {
    this.authSer.logout();
  }

}
