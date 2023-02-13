import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TbodyComponent implements OnInit {
  @Input() allUsers: User[] = [];
  sortKey: string = '';
  toggle = false;

  constructor(private router: Router, private userSer: UsersService) { }

  ngOnInit() {
    this.userSer.userSort.subscribe(value => this.onClick(value));
  }


  private onClick(heading) {
    switch (heading) {
      case 'Index':
        this.sort('id');
        break;
      case 'First Name':
        this.sort('fname');
        break;
      case 'Last Name':
        this.sort('lname');
        break;
      case 'Email':
        this.sort('email');
        break;
      case 'Phone':
        this.sort('phone');
        break;
      case 'Gender':
        this.sort('gender');
        break;
      default:
        break;
    }
  }

  private sort(key: string) {
    this.sortKey = key;
    this.toggle = !this.toggle;
  }


  private onEdit(id: number) {
    this.router.navigate(['rform', id]);
  }
  private onDelete(id: number) {
    console.log(id);
    this.userSer.deleteUser(id);
    console.log(this.userSer.users);
  }

}
