import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css']
})
export class TbodyComponent implements OnChanges, OnInit {
  @Input() allUsers: User[] = [];
  @Input() search: string = '';
  @Input() headings = [];

  users: User[] = [];
  loadUsers: User[] = [];
  searchUsers: User[] = [];
  paginator = false;
  sortKey: string = '';
  reverse = true;
  currentPage: number = 1;

  constructor(private router: Router, private userSer: UsersService) { }

  ngOnInit() {
    if (this.allUsers.length > 10) {
      this.paginate();
    }

    else
      this.users = this.allUsers;
    this.userSer.pageNumber.subscribe(value => {
      this.currentPage = value;
      this.paginate();
    });
  }

  ngOnChanges(): void {
    if (this.search == '' || !this.search) {
      this.userSer.pageNumber.next(1);
      this.users = this.allUsers;
      this.userSer.userNumber.next(this.users.length);
      this.paginate();
    }

    else
      this.searchUser();
  }

  onClick(heading) {
    switch (heading) {
      case 'Index':
        this.sort('id');
        break;
      case 'First Name':
        this.sort('fname');
        break;
      case 'Last Name':
        this.sort('lname');
        break;
      case 'Email':
        this.sort('email');
        break;
      case 'Phone':
        this.sort('phone');
        break;
      case 'Gender':
        this.sort('gender');
        break;
      default:
        break;
    }
  }

  private searchUser() {
    this.userSer.pageNumber.next(1);
    this.searchUsers = this.allUsers.filter(user => {
      return user.fname.toLowerCase().match(this.search.toLowerCase());
    });

    if (this.searchUsers.length > 10) {
      this.users = this.searchUsers;
      this.userSer.userNumber.next(this.users.length);
      console.log(this.users.length);
      this.paginate();
    }
    else {
      this.loadUsers = this.searchUsers;
      this.users = this.searchUsers;
      this.userSer.userNumber.next(this.users.length);
      this.paginator = false;
    }

  }

  private sort(key: string) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  private paginate() {
    this.paginator = true;
    this.loadUsers = [];
    for (let i = (this.currentPage - 1) * 10; i < this.currentPage * 10; i++) {
      if (this.users[i])
        this.loadUsers.push(this.users[i]);
    }
  }

  private onEdit(id: number) {
    this.router.navigate(['rform', id]);
  }
  private onDelete(id: number) {
    this.userSer.deleteUser(id);
  }

}
