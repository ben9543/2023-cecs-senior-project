import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

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
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  request!: FormGroup;
  user: any = {}; // Initialize user object
  userData: any | null = null;
  universities: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private activeroute: ActivatedRoute,
    private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar, 
    private confirmationDialogService: ConfirmationDialogService) { }
  
    ngOnInit(): void {
      // Subscribe to userData$ and wait for it to emit data
      this.authService.userData$.subscribe((userData) => {
        this.userData = userData;
    
        // Once userData is available, initialize the form
        this.initializeForm();
      });
    }

    initializeForm(): void {
      // Check if userData is available before initializing the form
       this.userService.getUniversityList().subscribe((universities: any) => {
          this.universities = universities.data;
        });
      if (this.userData) {
        this.request = this.formBuilder.group({
          username: [
            this.userData.user_name,
            [Validators.required, usernameEmptyValidator],
          ],
          email: [
            this.userData.user_email,
            [Validators.required, emailEmptyValidator, emailFormatValidator],
          ],
          college: [
            this.userData.university_name,
            [Validators.required, collegeEmptyValidator],
          ],
        });
      }
    }
    onSubmit(): void {
      if (this.request.valid) {
        const updatedUserData = {
          user_id: this.userData.user_id,
          // get these from the user's account
          username: this.request.value.username,
          university: this.request.value.college,
          // request inputs
          location: this.request.value.location,
          comment: this.request.value.comment
        };
      }
    }
}
