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
  loading: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient,
     private userService: UserService, private authService: AuthService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', Validators.required],
    });
    this.authService.logout();
  }

  onSubmit(): void {
    if (this.login.valid) {
      this.loading = true;
      const { email, password } = this.login.value;

      this.userService.login(email.toLowerCase(), password).subscribe(
        (response: any) => {
          localStorage.setItem('header', JSON.stringify(response));
          // Fetch the user data based on the email from UserService
          this.userService.getUserByEmail(email.toLowerCase()).subscribe(
            (userData: any) => {
              const user = userData;
              setTimeout(() => {
                this.authService.setUserData(user);
                // Navigate to home
                this.loading = false;
                this.router.navigate(['/home']);

              }, 3000);
            },
            (userError) => {
              console.error('Error fetching user data:', userError);
            }
          );
        },
        (error) => {
          if (error.status === 401) {
            this.loading = false;
            this.snackBar.open('Invalid email or password', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Login failed! Unknown Error', 'Close', { duration: 5000 });
          }
        }
      );
    }
  }
}