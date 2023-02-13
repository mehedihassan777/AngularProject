import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-qparamsuser',
  templateUrl: './qparamsuser.component.html',
  styleUrls: ['./qparamsuser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QparamsuserComponent {

  users: User[] = [];
  loadUsers: User[] = [];
  headings: string[] = ['Index', 'First Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Action'];

  constructor(private userSer: UsersService) { }

  ngOnInit(): void {
    this.users = this.userSer.users;
    if (this.users.length > 10)
      this.paginate(1);
    else
      this.loadUsers = this.users;

    this.userSer.pageNumber.subscribe(value => {
      if (value)
        this.paginate(value);
      else
        this.paginate(1);
    });
    this.userSer.userChanged.subscribe(message => {
      console.log(message);
      this.searchInput('');
    });

  }

  searchInput(input: string) {
    if (input == '' || !input) {
      this.users = this.userSer.users;
      this.userSer.userNumber.next(this.users.length);
      this.paginate(1);
    }

    else
      this.searchUser(input);
  }


  private searchUser(searchName) {
    this.userSer.pageNumber.next(1);
    let searchUsers = this.userSer.users.filter(user => {
      return user.fname.toLowerCase().match(searchName.toLowerCase()) || user.lname.toLowerCase().match(searchName.toLowerCase());
    });

    if (searchUsers.length > 10) {
      this.users = searchUsers;
      this.userSer.userNumber.next(this.users.length);
      this.paginate(1);
    }
    else {
      this.loadUsers = searchUsers;
      this.users = searchUsers;
      this.userSer.userNumber.next(this.users.length);
    }

  }

  private paginate(currentPage) {
    this.loadUsers = [];
    for (let i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
      if (this.users[i])
        this.loadUsers.push(this.users[i]);
    }
  }

}
