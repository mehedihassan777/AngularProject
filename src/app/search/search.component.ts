import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchName = new EventEmitter<string>();
  @Input() allUserNames: string[] = [];
  query: string = '';
  suggestionHandle: boolean = true;

  onKeyUp(x: any) {
    this.suggestionHandle = true;
    this.query = x.target.value;
    this.searchName.emit(x.target.value);
  }

  onSelect(value: string) {
    this.query = value;
    this.searchName.emit(value);
    this.suggestionHandle = false;
  }
}
