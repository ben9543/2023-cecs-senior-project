import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-me',
  templateUrl: './rate-me.component.html',
  styleUrls: ['./rate-me.component.css']
})
export class RateMeComponent {
  //comment: string = '';
  name: string = '';

  rate!:FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.rate = this.formBuilder.group({
      comment: ['', Validators.required]
    })
  }

  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValue: number = 0;

  onSubmit(){
    if (this.rate.valid && this.finalValue) {
      const { comment } = this.rate.value;
      this.rate.reset()
      this.finalValue = 0
      this.router.navigate(['/home']);
    }
  }
}
