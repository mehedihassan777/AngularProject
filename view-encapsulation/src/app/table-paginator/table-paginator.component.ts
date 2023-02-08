import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit {
  pages = [];
  currentPage: number = 1;

  constructor(private userSer: UsersService) {
    this.makePage(this.userSer.users.length);
  }

  ngOnInit(): void {
    this.userSer.pageNumber.subscribe(value => {
      this.currentPage = value;
    });
    this.userSer.userNumber.subscribe(value => {
      this.makePage(value);
    });
  }

  private changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.pages.length)
      this.userSer.pageNumber.next(pageNumber);
  }

  private makePage(users: number) {
    this.pages = [];
    for (let i = 0; i < users / 10; i++) {
      this.pages.push(i + 1);
    }
  }
}
