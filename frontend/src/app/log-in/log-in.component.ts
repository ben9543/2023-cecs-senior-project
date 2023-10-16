import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  login!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient,
     private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.login.valid) {
      const { email, password } = this.login.value;

      this.userService.login(email, password).subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response.token);

          // Fetch the user data based on the email from UserService
          this.userService.getUserByEmail(email).subscribe(
            (userData) => {
              const user = userData;
              this.authService.setUserData(user); // Set userData
            },
            (userError) => {
              console.error('Error fetching user data:', userError);
            }
          );

          // Navigate to home
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 401) {
            this.snackBar.open('Invalid email or password', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Login failed! Unknown Error', 'Close', { duration: 5000 });
          }
        }
      );
    }
  }
}