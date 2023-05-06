import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  login!: FormGroup;
  errorMessage: string = '';
  
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient ) { }

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
        this.http.post<any>('http://127.0.0.1:5000/login', { email: email, password: password }).subscribe(response => {
          localStorage.setItem('access_token', response.token);
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