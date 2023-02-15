import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-qparamsuser',
  templateUrl: './qparamsuser.component.html',
  styleUrls: ['./qparamsuser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QparamsuserComponent {

  searchUsers: User[] = [];
  loadUsers: User[] = [];
  currentPage: number = 1;
  itemPerPage: number = 5;
  totalCount: number;
  headings: string[] = ['Id', 'First Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Action'];
  sortKey: string;
  toggle = false;

  constructor(private userSer: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.currentPage = Math.ceil(+this.route.snapshot.queryParams['id'] / this.itemPerPage);
      this.router.navigate([]);
    }
    this.loadPage();
    this.userSer.userChanged.subscribe(() => {
      this.loadPage();
    });
  }

  onClick(heading) {
    switch (heading) {
      case 'Id':
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

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.searchUsers.length > 0 ? this.loadSearch() : this.loadPage();

  }

  onDelete(id: number) {
    this.userSer.deleteUser(id);
    this.loadUsers.length < 1 ? this.currentPage -= 1 : '';
    this.loadPage();
  }

  searchInput(input: string) {
    if (input == '' || !input) {
      this.currentPage = 1;
      this.loadPage();
    }
    else
      this.searchUser(input);
  }


  private searchUser(searchName) {
    this.currentPage = 1;
    let findUsers = this.userSer.users.filter(user => {
      return user.fname.toLowerCase().match(searchName.toLowerCase()) || user.lname.toLowerCase().match(searchName.toLowerCase());
    });
    this.totalCount = findUsers.length;

    if (findUsers.length > 5) {
      this.searchUsers = findUsers;
      this.loadSearch();
    }
    else {
      this.loadUsers = findUsers;
      this.searchUsers = findUsers;
    }
  }

  private loadPage() {
    const data = this.userSer.getUserForPage(this.currentPage, this.itemPerPage);
    this.loadUsers = data.users;
    this.totalCount = data.totalUsers;
  }

  private loadSearch() {
    this.totalCount = this.searchUsers.length;
    this.loadUsers = this.searchUsers.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
  }

  private sort(key: string) {
    this.sortKey = key;
    this.toggle = !this.toggle;
  }
}
