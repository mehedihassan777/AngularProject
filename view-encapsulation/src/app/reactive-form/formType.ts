import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface UserFormType {
  fname: FormControl<string>;
  lname: FormControl<string>;
  email: FormControl<string | null>;
  phone: FormControl<number | null>;
  gender: FormControl<string>;
  sports: FormArray<FormGroup>;
}
