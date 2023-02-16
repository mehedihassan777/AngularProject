import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qparams',
  templateUrl: './qparams.component.html',
  styleUrls: ['./qparams.component.css']
})
export class QparamsComponent implements OnInit {
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

  loadUser: { role: string, status: string, id: number } = { role: '', status: '', id: NaN };
  userId: number =1;
  username: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['id'];
    //console.log(this.userId);
    this.loadUser = this.users[this.userId - 1];
  }

  onSetUserName() {
    this.router.navigate(['/qpramsuser'], { queryParams: { name: this.username }, queryParamsHandling: 'merge' });
  }

}
