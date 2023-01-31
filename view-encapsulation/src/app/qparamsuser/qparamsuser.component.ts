import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qparamsuser',
  templateUrl: './qparamsuser.component.html',
  styleUrls: ['./qparamsuser.component.css']
})
export class QparamsuserComponent {
  users = [
    {
      role: 'admin',
      status: 'active',
      id: 1
    },
    {
      role: 'moderator',
      status: 'inactive',
      id: 2
    },
    {
      role: 'user',
      status: 'active',
      id: 3
    }
  ];

  loadUser: { role: string, status: string, id: number };
  userId: number;
  username: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];
    //console.log(this.userId);
    this.username = this.route.snapshot.queryParams['name'];
    this.loadUser = this.users[this.userId - 1];
  }
}
