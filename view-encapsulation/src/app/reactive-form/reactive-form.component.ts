import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../sports.model';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit, DoCheck {
  practiceForm: FormGroup;
  id: number;
  user = new User('', '', null, '', []);

  constructor(private router: Router, private route: ActivatedRoute, private userSer: UsersService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'] + 1;
    if (this.id > this.userSer.users.length)
      this.id = undefined;
    console.log(this.id);
    if (this.id) {
      this.user = this.userSer.getUser(this.id - 1);
    }
    this.loadForm();
  }

  loadForm() {
    let sports = new FormArray([]);
    if (this.user.sports) {
      for (let sport of this.user.sports) {
        sports.push(
          new FormGroup({
            name: new FormControl(sport.name, Validators.required),
            pYear: new FormControl(sport.pYear)
          })
        );
      }
    }

    this.practiceForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      gender: new FormControl(this.user.gender ? this.user.gender : 'Male'),
      sports: sports
    });
  }

  onAddSport() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.practiceForm.get('sports')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      pYear: new FormControl(null)
    }));
  }

  onSubmit() {
    if (this.practiceForm.valid) {
      if (this.id) {
        this.userSer.updateUser(this.id-1, this.practiceForm.value);
      }
      else
        this.userSer.addUser(this.practiceForm.value);

      console.log(this.practiceForm.valid);
      this.router.navigate(['/qpramsuser']);
    }
  }

  onDeleteSport(i) {
    (<FormArray>this.practiceForm.get('sports')).removeAt(i);
  }

  get controls() {
    return (this.practiceForm.get('sports') as FormArray).controls;
  }

  ngDoCheck(): void {
    if (this.practiceForm.value.phone) {
      this.practiceForm.controls['email'].clearValidators();
      this.practiceForm.controls['email'].updateValueAndValidity();
    }
    else if (this.practiceForm.value.email) {
      this.practiceForm.controls['phone'].clearValidators();
      this.practiceForm.controls['phone'].updateValueAndValidity();
    }
    else if (!this.practiceForm.value.phone && !this.practiceForm.value.email) {
      this.practiceForm.controls['phone'].setValidators([Validators.required]);
      this.practiceForm.controls['email'].setValidators([Validators.required, Validators.email]);
      this.practiceForm.controls['phone'].updateValueAndValidity();
      this.practiceForm.controls['email'].updateValueAndValidity();
    }
    else if (!this.practiceForm.value.phone) {
      this.practiceForm.controls['email'].setValidators([Validators.required, Validators.email]);
      this.practiceForm.controls['email'].updateValueAndValidity();
    }
    else if (!this.practiceForm.value.email) {
      this.practiceForm.controls['phone'].setValidators([Validators.required]);
      this.practiceForm.controls['phone'].updateValueAndValidity();
    }
  }
}
