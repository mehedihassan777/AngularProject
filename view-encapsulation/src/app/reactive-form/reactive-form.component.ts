import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { UserFormType } from './formType';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit, DoCheck {
  practiceForm: FormGroup<UserFormType>;
  //id: number;
  //user = new User('', '', null, '', []);

  constructor(private router: Router, private route: ActivatedRoute, private userSer: UsersService) { }

  ngOnInit() {
    //console.log(this.userSer.users[this.route.snapshot.params['id']]);
    if (this.userSer.users[this.route.snapshot.params['id']] === undefined) {
      //let user: User = {name: '', email: '', phone: null, gender: '', sports: [{name:'', pYear: null}]};
      this.loadForm({ name: '', email: '', phone: null, gender: '', sports: [{ name: '', pYear: null }] });
    }
    else {
      this.loadForm(this.userSer.users[this.route.snapshot.params['id']]);
    }
  }

  loadForm(user: User) {
    let sports = new FormArray([]);
    let mode = false;
    if (user.name) {
      mode = true;
      for (let sport of user.sports) {
        sports.push(
          new FormGroup({
            name: new FormControl(sport.name, Validators.required),
            pYear: new FormControl(sport.pYear)
          })
        );
      }
    }

    this.practiceForm = new FormGroup({
      name: new FormControl(user.name, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      mode: new FormControl(mode),
      phone: new FormControl(user.phone, [Validators.required]),
      gender: new FormControl(user.gender ? user.gender : 'Male'),
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
      if (this.userSer.users[this.route.snapshot.params['id']]) {
        this.userSer.updateUser(this.route.snapshot.params['id'], { name: this.practiceForm.value.name, email: this.practiceForm.value.email, phone: this.practiceForm.value.phone, gender: this.practiceForm.value.gender, sports: this.practiceForm.value.sports });
      }
      else
        this.userSer.addUser({ name: this.practiceForm.value.name, email: this.practiceForm.value.email, phone: this.practiceForm.value.phone, gender: this.practiceForm.value.gender, sports: this.practiceForm.value.sports });

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
