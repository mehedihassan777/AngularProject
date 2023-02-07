import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.css'],
})
export class TheadComponent {
  @Input() headings = [];

  constructor(private userSer: UsersService) { }

  // onClick(heading) {
  //   switch (heading) {
  //     case 'Index':
  //       this.userSer.clickSort.next('id');
  //       break;
  //     case 'First Name':
  //       this.userSer.clickSort.next('fname');
  //       break;
  //     case 'Last Name':
  //       this.userSer.clickSort.next('lname');
  //       break;
  //     case 'Email':
  //       this.userSer.clickSort.next('email');
  //       break;
  //     case 'Phone':
  //       this.userSer.clickSort.next('phone');
  //       break;
  //     case 'Gender':
  //       this.userSer.clickSort.next('gender');
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
