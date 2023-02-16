import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: ['./td-form.component.css']
})
export class TdFormComponent {

  username: string = '';
  inpEmail: string = '';
  comment: string = '';
  formValue:any;

  onSubmit(form: NgForm) {
    this.username = form.value.username;
    this.inpEmail = form.value.email;
    this.comment = form.value.comment;
    console.log(form.value);
  }
}
