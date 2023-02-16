import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheadComponent {
  @Input() headings = [];
  @Output() clicked = new EventEmitter<string>();

  onClick(heading: string) {
    this.clicked.emit(heading);
  }
}
