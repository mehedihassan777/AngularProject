import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Sport } from '../sports.model';

export interface UserFormType {
    name: FormControl<string>;
    email: FormControl<string | null>;
    phone: FormControl<number | null>;
    gender: FormControl<string>;
    sports: FormArray<FormGroup>;
}