import { Component, DoCheck, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './login/auth.service';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'view-encapsulation';

  setUsers: User[] = [
    { id: 1, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 2, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 3, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 4, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 5, fname: 'Ann ', lname: 'White', email: 'mehadilemon160@gmail.com', phone: 1773696417, password: '12345', gender: 'Female', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 6, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 7, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 8, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 9, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 10, fname: 'Ann ', lname: 'White', email: 'mehadilemon160@gmail.com', phone: 1773696417, password: '12345', gender: 'Female', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 11, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 12, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 13, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 14, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 15, fname: 'Ann ', lname: 'White', email: 'mehadilemon160@gmail.com', phone: 1773696417, password: '12345', gender: 'Female', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 16, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 17, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 18, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 19, fname: 'Theresa', lname: 'Hernandez', email: 'annswhite@jourrapide.com', phone: 1773696417, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 20, fname: 'Ann ', lname: 'White', email: 'mehadilemon160@gmail.com', phone: 1773696417, password: '12345', gender: 'Female', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 21, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 22, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 23, fname: 'Mehedi', lname: 'Hassan', email: 'mehadihassan170@gmail.com', phone: 1731192089, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 24, fname: 'Test', lname: 'User', email: 'test@gmail.com', phone: 12345, password: '12345', gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { id: 25, fname: 'Ann ', lname: 'White', email: 'mehadilemon160@gmail.com', phone: 1773696417, password: '12345', gender: 'Female', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] }
  ];

  constructor(private userSer: UsersService, private authSer: AuthService) { }

  ngOnInit(): void {
    this.userSer.users = this.setUsers;
    //this.userSer.setUsers();
    this.authSer.autoLogin();
  }

  ngDoCheck(): void {
    if (this.authSer.loggedIn) {
      clearTimeout(this.authSer.autoLogoutHandler);
      this.authSer.autoLogout(60000);
    }

  }

}
