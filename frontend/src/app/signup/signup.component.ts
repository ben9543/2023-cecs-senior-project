import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signup!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.signup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      college: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    this.router.navigate(['/login']);
    const { username, college, email, password } =this.signup.value;
    this.http.post('http://127.0.0.1:5000/api/signup', { username, college, email, password })
    .subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status === 409) {
          this.errorMessage = 'User Already Exists';
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    );

  }
}