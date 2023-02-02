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
    new User('Mehedi', 'mehadihassan170@gmail.com', null, 'Male', [new Sport('Cricket', 7), new Sport('Football', 5)]),
    new User('Hassan', null, 1773696417, 'Male', [new Sport('Cricket', 7), new Sport('Football', 5)]),
    new User('Lemon', 'mehadilemon160@gmail.com', 1773696417, 'Male', [new Sport('Cricket', 7), new Sport('Football', 5)])
  ];

  constructor(private userSer: UsersService) { }

  ngOnInit(): void {
    this.userSer.users = this.setUsers;
  }

}
