import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../sports.model';
import { User } from '../user.model';
import { UsersService } from '../users.service';
import { UserFormType } from './formType';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit, DoCheck {
  practiceForm: FormGroup<UserFormType>;
  id: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userSer: UsersService
  ) {}

  ngOnInit() {
    this.createForm();

    const id = this.route.snapshot.params['id'];
    if (id && !isNaN(id)) {
      this.id = id;
      const user = this.userSer.getUser(id);
      user && this.loadForm(user);
    }
  }

  createForm() {
    this.practiceForm = new FormGroup<UserFormType>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      gender: new FormControl('Male'),
      sports: new FormControl([]),
    });
  }

  loadForm(user: User) {
    this.practiceForm.patchValue(user);
    if (user.sports?.length) {
      user.sports.map((sport) => this.onAddSport(sport));
    }
  }

  onAddSport(sport?: Sport) {
    const control = this.practiceForm.get('sports') as FormArray;
    control.push(
      new FormGroup({
        name: new FormControl(sport ? sport.name : null, Validators.required),
        pYear: new FormControl(sport ? sport.pYear : null),
      })
    );
  }

  onSubmit() {
    if (this.practiceForm.valid) {
      if (this.userSer.users[this.route.snapshot.params['id']]) {
        this.userSer.updateUser(this.route.snapshot.params['id'], {
          name: this.practiceForm.value.name,
          email: this.practiceForm.value.email,
          phone: this.practiceForm.value.phone,
          gender: this.practiceForm.value.gender,
          sports: this.practiceForm.value.sports,
        });
      } else
        this.userSer.addUser({
          name: this.practiceForm.value.name,
          email: this.practiceForm.value.email,
          phone: this.practiceForm.value.phone,
          gender: this.practiceForm.value.gender,
          sports: this.practiceForm.value.sports,
        });

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
    } else if (this.practiceForm.value.email) {
      this.practiceForm.controls['phone'].clearValidators();
      this.practiceForm.controls['phone'].updateValueAndValidity();
    } else if (
      !this.practiceForm.value.phone &&
      !this.practiceForm.value.email
    ) {
      this.practiceForm.controls['phone'].setValidators([Validators.required]);
      this.practiceForm.controls['email'].setValidators([
        Validators.required,
        Validators.email,
      ]);
      this.practiceForm.controls['phone'].updateValueAndValidity();
      this.practiceForm.controls['email'].updateValueAndValidity();
    } else if (!this.practiceForm.value.phone) {
      this.practiceForm.controls['email'].setValidators([
        Validators.required,
        Validators.email,
      ]);
      this.practiceForm.controls['email'].updateValueAndValidity();
    } else if (!this.practiceForm.value.email) {
      this.practiceForm.controls['phone'].setValidators([Validators.required]);
      this.practiceForm.controls['phone'].updateValueAndValidity();
    }
  }
}
