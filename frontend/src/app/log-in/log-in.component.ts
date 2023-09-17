import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  login!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private userService: UserService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.login.valid) {
        console.log(this.login.value)
        const { email, password } = this.login.value;
        this.http.post<any>('http://127.0.0.1:5000/api/login', { email: email, password: password }).subscribe(response => {
          localStorage.setItem('access_token', response.token);
          // Fetch the username based on the email from UserService
          this.userService.getUserByEmail(email).subscribe(
            (userData) => {
              const user = userData;
              console.log('User from login:', user);
              this.authService.setUserData(user); // Set userData

            },
            (userError) => {
              console.error('Error fetching username:', userError);
            }
          );
          // Navigate to home
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials';
          } else {
            this.errorMessage = 'An unknown error occurred';
          }
        }
        ); 
    }
  }
}