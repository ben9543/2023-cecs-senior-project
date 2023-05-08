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
  constructor(private router: Router, private formBuilder: FormBuilder) { }
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
  }
}