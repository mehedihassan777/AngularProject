import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Sport } from './sports.model';
import { User } from './user.model';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'view-encapsulation';

  setUsers: User[] = [
    { name: 'Mehedi', email: 'mehadihassan170@gmail.com', phone: null, gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { name: 'Hassan', email: '', phone: 1773696417, gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] },
    { name: 'Lemon', email: 'mehadilemon160@gmail.com', phone: 1773696417, gender: 'Male', sports: [{ name: 'Cricket', pYear: 7 }, { name: 'Football', pYear: 5 }] }
  ];

  constructor(private userSer: UsersService) { }

  ngOnInit(): void {
    this.userSer.users = this.setUsers;
  }

}
