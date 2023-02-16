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

  loadUsers: User[] = [];
  currentPage: number = 1;
  itemPerPage: number = 5;
  totalCount: number = 0;
  headings: string[] = ['Id', 'First Name', 'Last Name', 'Email', 'Phone', 'Gender', 'Action'];
  sortKey: string = 'Id';
  toggle: boolean = false;
  searchText: string = '';
  searchMode: boolean = false;
  searchHandler: any;


  constructor(private userSer: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['id']) {
      this.currentPage = Math.ceil(+this.route.snapshot.queryParams['id'] / this.itemPerPage);
      this.router.navigate([]);
    }
    this.loadPage();
  }

  searchInput(input: string) {
    this.searchText = input;
    clearTimeout(this.searchHandler);
    this.searchHandler = setTimeout(() => {
      if (input == '' || !input) {
        this.currentPage = 1;
        this.loadPage();
        this.searchMode = false;
      }
      else
        this.searchUser(undefined, input);
    }, 2000);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.searchMode ? this.searchUser(pageNumber, this.searchText) : this.loadPage();
  }

  onClick(heading: string) {
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

  onDelete(id: number) {
    this.userSer.deleteUser(id);
    this.loadUsers.length < 2 ? this.currentPage -= 1 : '';
    this.loadPage();
  }

  private searchUser(currentPage?: number, searchName?: string) {
    currentPage ? this.currentPage = currentPage : this.currentPage = 1;
    const data = this.userSer.getUserForPage(this.currentPage, this.itemPerPage, searchName);
    this.loadUsers = data.users;
    this.totalCount = data.totalUsers;
    this.searchMode = true;
  }

  private loadPage() {
    const data = this.userSer.getUserForPage(this.currentPage, this.itemPerPage);
    this.loadUsers = data.users;
    this.totalCount = data.totalUsers;
  }

  private sort(key: string) {
    this.sortKey = key;
    this.toggle = !this.toggle;
  }
}
