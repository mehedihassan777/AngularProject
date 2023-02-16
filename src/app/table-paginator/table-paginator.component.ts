import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnChanges {
  pages: number [] = [];
  loadPages: number[] = [];
  @Input() currentPage: number = 1;
  @Input() totalCount: number = 1;
  @Input() itemPerPage: number = 1;
  @Output() pageChanges = new EventEmitter<number>();

  ngOnChanges(): void {
    this.makePage(this.totalCount);
  }

  private changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.pages.length)
      this.pageChanges.emit(pageNumber);
  }

  private makePage(totalCount: number) {
    this.pages = [];
    let index = 0;
    for (let i = 0; i < totalCount / this.itemPerPage; i++) {
      this.pages.push(i + 1);
    }
    if (this.pages.length < 3) {
      this.loadPages = [];
      for (let i = 0; i < this.pages.length; i++) {
        this.loadPages[i] = i + 1;
      }
    }
    else if (this.currentPage <= 2)
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
