import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  practiceForm: FormGroup;
  genders = ['male', 'female'];
  username: string = '';
  loadEmail: string = '';
  loadPhone: string = '';
  gender: string = '';
  sports: Array<string> = [];
  submitted = false;
  showEmail = true;
  showPhone = true;
  or = true;

  ngOnInit() {
    this.practiceForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null),
      'gender': new FormControl('male'),
      'sports': new FormArray([])
    });
    this.practiceForm.controls['phone'].setValidators([Validators.required, Validators.minLength(10)]);
    // this.practiceForm.controls['phone'].statusChanges.subscribe(status => {
    //   //console.log(status);
    //   if (status == 'VALID') {
    //     this.showEmail = false;
    //     this.or = false;
    //     this.practiceForm.controls['email'].clearValidators();
    //     this.practiceForm.controls['email'].updateValueAndValidity();
    //   }
    // });

    this.practiceForm.controls['email'].statusChanges.subscribe(status => {
      console.log('email' + status);
      if (status == 'VALID' && this.showEmail) {
        this.showPhone = false;
        this.or = false;
        this.practiceForm.controls['phone'].clearValidators();
        this.practiceForm.controls['phone'].updateValueAndValidity();
      }
      else {
        if (this.showEmail && this.showPhone)
          this.or = true;
        this.showPhone = true;
        this.practiceForm.controls['phone'].setValidators([Validators.required, Validators.minLength(10)]);
      }
    });

    this.practiceForm.controls['phone'].statusChanges.subscribe(status => {
      console.log('phone' + status);
      if (status == 'VALID' && this.showPhone) {
        this.showEmail = false;
        this.or = false;
        this.practiceForm.controls['email'].clearValidators();
        this.practiceForm.controls['email'].updateValueAndValidity();

      }
      else {
        if (this.showEmail && this.showPhone)
          this.or = true;
        this.showEmail = true;
        this.practiceForm.controls['email'].setValidators([Validators.required, Validators.email]);
      }
    });


  }

  onAddSport() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.practiceForm.get('sports')).push(control);
  }

  onSubmit() {
    this.username = this.practiceForm.get('username').value;
    this.loadEmail = this.practiceForm.get('email').value;
    this.loadPhone = this.practiceForm.get('phone').value;
    this.gender = this.practiceForm.get('gender').value;
    this.sports = this.practiceForm.get('sports').value;
    this.submitted = true;
    this.practiceForm.reset();
    console.log(this.loadEmail);
  }

  onDeleteSport(i) {
    (<FormArray>this.practiceForm.get('sports')).removeAt(i);
  }

  get controls() {
    return (this.practiceForm.get('sports') as FormArray).controls;
  }
}
