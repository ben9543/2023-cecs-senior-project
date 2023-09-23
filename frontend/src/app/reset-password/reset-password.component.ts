import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  reset!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, 
    private userService: UserService, private snackBar: MatSnackBar, private confirmationDialogService: ConfirmationDialogService) { }
  
  ngOnInit(): void {
    this.reset = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]]
    });
  }
  
  onSubmit(): void {
    const { email } = this.reset.value;

    this.userService.checkEmail(email).subscribe((emailResponse: any) => {
      if (emailResponse.taken) {
        this.router.navigate(['/login']);
        // Open the confirmation dialog
        this.confirmationDialogService.openPasswordResetConfirmation();
      } else {
        this.snackBar.open('Email provided is not associated to an account! Please re-enter your email', 'Close', { duration: 5000 });
      }
    });
  }
}