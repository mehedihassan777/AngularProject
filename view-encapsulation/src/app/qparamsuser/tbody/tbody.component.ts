import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TbodyComponent implements OnChanges, OnInit {
  @Input() allUsers: User[] = [];
  @Input() search: string = '';
  @Input() headings = [];

  users: User[] = [];
  loadUsers: User[] = [];
  sortKey: string = '';
  toggle = false;

  constructor(private router: Router, private userSer: UsersService) { }

  ngOnInit() {
    if (this.allUsers.length < 10)
      this.users = this.allUsers;

    this.userSer.pageNumber.subscribe(value => {
      if (value)
        this.paginate(value);
      else
        this.paginate(1);
    });
    this.userSer.userChanged.subscribe(message => {
      console.log(message);
      this.ngOnChanges();
    });

    this.userSer.userSort.subscribe(value => this.onClick(value));
  }

  ngOnChanges(): void {
    if (this.search == '' || !this.search) {
      this.users = this.allUsers;
      this.userSer.userNumber.next(this.users.length);
      this.paginate(1);
    }

    else
      this.searchUser();
  }

  private onClick(heading) {
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
    let searchUsers = this.allUsers.filter(user => {
      return user.fname.toLowerCase().match(this.search.toLowerCase());
    });

    if (searchUsers.length <= 0)
      searchUsers = this.allUsers.filter(user => {
        return user.lname.toLowerCase().match(this.search.toLowerCase());
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

  private sort(key: string) {
    this.sortKey = key;
    this.toggle = !this.toggle;
  }

  private paginate(currentPage) {
    this.loadUsers = [];
    for (let i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
      if (this.users[i])
        this.loadUsers.push(this.users[i]);
    }
  }

  private onEdit(id: number) {
    this.router.navigate(['rform', id]);
  }
  private onDelete(id: number) {
    console.log(id);
    this.userSer.deleteUser(id);
    console.log(this.userSer.users);
  }

}
