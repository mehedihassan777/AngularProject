import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchName = new EventEmitter<string>();

  onKeyUp(x: any) {
    this.searchName.emit(x.target.value);
  }
}
