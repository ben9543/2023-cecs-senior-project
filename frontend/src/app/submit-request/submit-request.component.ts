import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  request !: FormGroup;

  attributes = new FormControl('', Validators.required);
  attributeList: string[] = ['WiFi', 'Power', 'ADA Accessible'];

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.request = this.formBuilder.group({
      university: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.request.valid) {
      const { university, location, description } = this.request.value;
      console.log(university);
      console.log(location);
      console.log(description);
    }
  }
}
