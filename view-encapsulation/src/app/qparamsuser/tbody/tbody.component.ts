import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TbodyComponent implements OnInit {
  @Input() allUsers: User[] = [];
  @Output() delete = new EventEmitter<number>();
  @Input() sortKey: string = '';
  @Input() toggle = false;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  private onEdit(id: number) {
    this.router.navigate(['rform', id]);
  }
  private onDelete(id: number) {
    this.delete.emit(id);
  }

}
