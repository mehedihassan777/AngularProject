import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authSer: AuthService, private router: Router) { }

  onSubmit(formData) {
    this.authSer.login(formData.value.username, formData.value.password);
    this.router.navigate(['/qpramsuser'])
  }
}
