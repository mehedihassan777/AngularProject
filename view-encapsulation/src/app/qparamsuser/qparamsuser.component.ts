import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-qparamsuser',
  templateUrl: './qparamsuser.component.html',
  styleUrls: ['./qparamsuser.component.css']
})
export class QparamsuserComponent {

  users: User[] = [];
  searchName: string;

  constructor(private router: Router, private userSer: UsersService) { }

  ngOnInit(): void {
    this.users = this.userSer.users;
  }

}
