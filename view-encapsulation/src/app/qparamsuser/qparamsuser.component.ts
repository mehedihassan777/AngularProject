import { Component, ViewEncapsulation } from '@angular/core';
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
  currentPage: number = 1;
  headings: string[] = ['Index', 'First Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Action'];

  constructor(private userSer: UsersService) { }

  ngOnInit(): void {
    this.users = this.userSer.users;
    if (this.users.length > 5)
      this.paginate(1);
    else
      this.loadUsers = this.users;

    this.userSer.userChanged.subscribe(message => {
      console.log(message);
      this.searchInput('');
    });
  }

  changePage(pageNumber: number) {
    if (pageNumber) {
      this.currentPage = pageNumber;
      this.paginate(pageNumber);
    }

    else {
      this.currentPage = 1;
      this.paginate(1);
    }
  }

  searchInput(input: string) {
    if (input == '' || !input) {
      this.users = this.userSer.users;
      this.paginate(1);
    }

    else
      this.searchUser(input);
  }


  private searchUser(searchName) {
    this.currentPage = 1;
    let searchUsers = this.userSer.users.filter(user => {
      return user.fname.toLowerCase().match(searchName.toLowerCase()) || user.lname.toLowerCase().match(searchName.toLowerCase());
    });

    if (searchUsers.length > 5) {
      this.users = searchUsers;
      this.paginate(1);
    }
    else {
      this.loadUsers = searchUsers;
      this.users = searchUsers;
    }
  }

  private paginate(currentPage) {
    const itemPerPage = 5;
    this.loadUsers = [];
    for (let i = (currentPage - 1) * itemPerPage; i < currentPage * itemPerPage; i++) {
      if (this.users[i])
        this.loadUsers.push(this.users[i]);
    }
  }
}
