import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { UserData } from '../DTOs/user-data.dto';


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
  userData!: UserData;
  universities: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private activeroute: ActivatedRoute,
    private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar, 
    private confirmationDialogService: ConfirmationDialogService) { }
  
ngOnInit(): void {
  this.userData = this.authService.getUserData();
  // Once userData is available, initialize the form
  this.initializeForm();
}

initializeForm(): void {
  // Check if userData is available before initializing the form
   this.userService.getUniversityList().subscribe((universities: any) => {
      this.universities = universities.data;
    });
  if (this.userData) {
    this.edit = this.formBuilder.group({
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
    if (this.edit.valid) {
      const updatedUserData = {
        user_id: this.userData.user_id,
        username: this.edit.value.username,
        email: this.edit.value.email,
        university: this.edit.value.college,
      };
  
      const usernameChanged = updatedUserData.username !== this.userData.user_name;
      const emailChanged = updatedUserData.email !== this.userData.user_email;
  
      // Check if the new username already exists
      if (usernameChanged) {
        this.userService.checkUsername(updatedUserData.username, updatedUserData.user_id).subscribe((usernameResponse: any) => {
          if (usernameResponse.taken) {
            this.snackBar.open('Username is already taken', 'Close', { duration: 3000 });
            return;
          } else {
            // Username is not taken, continue checking email if it has changed
            if (emailChanged) {
              this.checkEmailAndUpdate(updatedUserData);
            } else {
              // No email change, update the user data
              this.updateUser(updatedUserData);
            }
          }
        });
      } else {
        // Username has not changed, check email if it has changed
        if (emailChanged) {
          this.checkEmailAndUpdate(updatedUserData);
        } else {
          // No changes to username or email, check university if it has changed
          const universityChanged = updatedUserData.university !== this.userData.university_name;
          if (universityChanged) {
            // University has changed, update the user data
            this.updateUser(updatedUserData);
          } else {
            // No changes made
            this.snackBar.open('No changes made', 'Close', { duration: 3000 });
          }
        }
      }
    }
  }
  
  checkEmailAndUpdate(updatedUserData: any): void {
    // Check if the new email already exists
    this.userService.checkEmail(updatedUserData.email, updatedUserData.user_id).subscribe((emailResponse: any) => {
      if (emailResponse.taken) {
        this.snackBar.open('Email is already taken', 'Close', { duration: 3000 });
        return;
      } else {
        // Email is not taken, update the user data
        this.updateUser(updatedUserData);
      }
    });
  }
  
  updateUser(updatedUserData: any): void {
    this.userService.updateUser(updatedUserData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
        // Open the confirmation dialog
        this.confirmationDialogService.openSettingUpdateConfirmation();
      },
      (error) => {
        console.error('Error updating user data:', error);
      }
    );
  }
  
}