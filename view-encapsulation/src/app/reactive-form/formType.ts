import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface UserFormType {
    name: FormControl<string>;
    email: FormControl<string | null>;
    mode: FormControl<boolean>;
    phone: FormControl<number | null>;
    gender: FormControl<string>;
    sports: FormArray<FormGroup>
}