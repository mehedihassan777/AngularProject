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
  id: number = NaN;
  constructor(private router: Router, private route: ActivatedRoute, private userSer: UsersService) {
    this.practiceForm = new FormGroup<UserFormType>({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required]),
      gender: new FormControl('Male'),
      sports: new FormArray<any>([]),
    });
   }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id && !isNaN(id)) {
      this.id = +id;
      const user = this.userSer.getUser(id);
      user && this.loadForm(user);
    }
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

  get controls() {
    return (this.practiceForm.get('sports') as FormArray).controls;
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

  onDeleteSport(i: number) {
    (<FormArray>this.practiceForm.get('sports')).removeAt(i);
  }

  onSubmit() {
    if (this.practiceForm.valid) {
      const formUser = this.practiceForm.value as User;
      if (this.id) this.userSer.updateUser({ ...formUser, id: this.id });
      else {
        formUser.id = Math.max(...this.userSer.users.map(user => { return user.id })) + 1;
        this.userSer.addUser(formUser);
      }

      this.router.navigate(['/qpramsuser'], { queryParams: { id: this.id ? this.id : formUser.id } });
    }
  }

  private loadForm(user: User) {
    this.practiceForm.controls['cPassword'].clearValidators();
    this.practiceForm.controls['cPassword'].updateValueAndValidity();
    this.practiceForm.patchValue(user);
    if (user.sports?.length) {
      user.sports.map((sport) => this.onAddSport(sport));
    }
  }
}
