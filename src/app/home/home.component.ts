import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  constructor(private router: Router, private authSer: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.authSer.loggedIn;
  }

  onNavigate() {
    this.router.navigate(['/qpramsuser']);
  }
}
