import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// validator to check if the username is taken
const usernameTakenValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const username = control.value;

  const isUsernameTaken = checkIfUsernameIsTaken(username);

  if (isUsernameTaken) {
    return { usernameTaken: true };
  }

  return null;
};

function checkIfUsernameIsTaken(username: string): boolean {
  // logic to check if the username is taken here goes here
  // HTTP request to your server to check
  return false;
}

// validator to check if the username is empty
const usernameEmptyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const username = control.value;

  if (!username || username.trim() === '') {
    return { usernameEmpty: true };
  }

  return null;
};

// validator to check if the email is empty
const emailEmptyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.value;

  if (!email || email.trim() === '') {
    return { emailEmpty: true };
  }

  return null;
};

//validator to check if the email is valid
const emailFormatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.value;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailPattern.test(email)) {
    return { emailInvalid: true };
  }

  return null;
};

// validator to check if the college field is empty
const collegeEmptyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const college = control.value;

  if (!college || college.trim() === '') {
    return { collegeEmpty: true };
  }

  return null;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  edit!: FormGroup;
  
  constructor(private router: Router, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.edit = this.formBuilder.group({
      username: [
        '',
        [Validators.required, usernameTakenValidator, usernameEmptyValidator],
      ],
      email: [
        '',
        [Validators.required, emailEmptyValidator, emailFormatValidator],
      ],
      college: ['', [Validators.required, collegeEmptyValidator]],
    });
  }
  
  onSubmit(): void {
    this.router.navigate(['/home']);
  }
}
