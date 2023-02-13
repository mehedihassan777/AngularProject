import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnChanges {
  pages = [];
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
    this.pages = [];
    for (let i = 0; i < users / 10; i++) {
      this.pages.push(i + 1);
    }
  }
}
