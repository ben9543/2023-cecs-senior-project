import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-me',
  templateUrl: './rate-me.component.html',
  styleUrls: ['./rate-me.component.css']
})
export class RateMeComponent {
  comment: string = '';
  name: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }

  stepIndex: number = 1;
  steps: number[] = [1,2,3,4,5];
  finalValue: number = 0;
  onInputChange($event: any) {
    this.stepIndex = +$event.value;
    this.finalValue = this.steps[this.stepIndex];
  }

  postComment() {
    // handle the comment submission logic here
    console.log('Comment:', this.comment);
    this.comment = '';
    
  }
}
