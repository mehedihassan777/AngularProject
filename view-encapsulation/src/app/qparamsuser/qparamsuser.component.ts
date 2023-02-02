import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from '../sports.model';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-qparamsuser',
  templateUrl: './qparamsuser.component.html',
  styleUrls: ['./qparamsuser.component.css']
})
export class QparamsuserComponent {

  users: User[] = [];

  constructor(private router: Router, private userSer: UsersService) { }

  ngOnInit(): void {
    this.users = this.userSer.users;
  }

  onEdit(id: number) {
    this.router.navigate(['rform', id]);
  }
}
