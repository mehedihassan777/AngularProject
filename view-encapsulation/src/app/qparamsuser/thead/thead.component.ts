import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheadComponent {
  @Input() headings = [];
  @Output() clicked = new EventEmitter<string>();

  constructor(private userSer: UsersService) { }

  onClick(heading) {
    this.clicked.emit(heading);
  }
}
