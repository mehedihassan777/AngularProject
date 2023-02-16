import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSer: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authSer.loggedIn)
      this.router.navigate(['/qpramsuser']);
  }

  onSubmit(formData: NgForm) {
    if (formData.valid) {
      this.authSer.login(formData.value.username, formData.value.password);
      this.router.navigate(['/qpramsuser']);
    }

  }
}
