import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface UserFormType {
  fname: FormControl<string | null>;
  lname: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<number | null>;
  password: FormControl<string | null>;
  cPassword: FormControl<string | null>;
  gender: FormControl<string | null>;
  sports: FormArray<FormGroup | any>;
}
