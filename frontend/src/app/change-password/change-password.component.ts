import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  userData: any;
  changePassword!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private activeroute: ActivatedRoute,
    private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar, 
    private confirmationDialogService: ConfirmationDialogService) { }
  
  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
    this.changePassword = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    const { password, confirmPassword } = this.changePassword.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match', 'Close', {
          duration: 3000,
        });
        return; 
      }

      this.userData.password = password;

      console.log(this.userData)

      this.userService.changePassword(this.userData).subscribe((response: any) => {
        if (response.status) {
          this.router.navigate(['/login']);
          this.confirmationDialogService.openPasswordChangedConfirmation();
        }else{
          this.snackBar.open('Password change failed!', 'Close', { duration: 3000 });
        }
      });
  }
  
}