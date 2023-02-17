import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { findIndex } from 'lodash';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnChanges {

  @Input() query: string = '';
  @Input() allUserNames: string[] = [];
  suggestions: string[] = [];
  @Input() suggestionHandle: boolean = true;
  @Output() searchSuggestion = new EventEmitter<string>();

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.query == '')
      this.suggestions = [];
    else if (this.allUserNames.findIndex(name => name.toLocaleLowerCase() == this.query.toLocaleLowerCase()) != -1)
      this.suggestions = [];
    else
      this.getSearchSuggestions();
  }

  getSearchSuggestions() {
    this.suggestions = [];
    this.suggestions = this.allUserNames.filter(userName => {
      return userName.toLowerCase().match(this.query.toLowerCase());
    });
  }

  selectSuggestion(suggestion: string) {
    this.searchSuggestion.emit(suggestion);
  }
}
