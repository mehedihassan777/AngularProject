import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnChanges {
  pages = [];
  loadPages = [];
  @Input() currentPage: number;
  @Input() userNumber: number;
  @Output() nextPage = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    this.makePage(this.userNumber);
  }

  private changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.pages.length)
      this.nextPage.emit(pageNumber);
  }

  private makePage(users: number) {
    const itemPerPage = 5;
    this.pages = [];
    let index = 0;
    for (let i = 0; i < users / itemPerPage; i++) {
      this.pages.push(i + 1);
    }
    if (this.currentPage <= 2)
      for (let i = 0; i < 3; i++) {
        this.loadPages[index] = this.pages[i];
        index++;
      }

    else if (this.currentPage >= this.pages[this.pages.length - 2])
      for (let i = this.pages.length - 3; i < this.pages.length; i++) {
        this.loadPages[index] = this.pages[i];
        index++;
      }
    else
      for (let i = this.currentPage - 2; i < this.currentPage + 1; i++) {
        this.loadPages[index] = this.pages[i];
        index++;
      }
  }
}
