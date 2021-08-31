import { FormGroup, AbstractControl, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty';
// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
export function EitherOne(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.EitherOne) {

            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value == "" && matchingControl.value == "") {
            matchingControl.setErrors({ EitherOne: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
export const atLeastOne = (validator: ValidatorFn, controls: string[] = null) => (
    group: FormGroup,
): ValidationErrors | null => {
    if (!controls) {
        controls = Object.keys(group.controls)
    }

    const hasAtLeastOne = group && group.controls && controls
        .some(k => !validator(group.controls[k]));

    return hasAtLeastOne ? null : {
        atLeastOne: true,
    };
};
export function removeSpaces(control: AbstractControl) {//().?''""-
    return observableOf(control.value.replace(/\s/g, '') == '').pipe(
        
        map(response => {
            if (control && control.value && !control.value.replace(/\s/g, '').length) {
                control.setValue('');
            }
            return response;
        }),
        map(result => result ? { required: true } : null)

    )
}

export function validateEmail(control: AbstractControl) {
    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return observableOf(control.value.replace(/\s/g, '')).pipe(
        map(response => {
            if (control && control.value && !control.value.replace(/\s/g, '').length) {
                control.setValue('');
                return Observable.empty();
            } else {
                if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
                    return response;
                }
            }
            ;
        }),
        map(result => (result !== '') ? (!EMAIL_REGEXP.test(control.value) ? { email: true } : null) : { required: true })

    )
}



