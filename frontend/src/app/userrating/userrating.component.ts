import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-userrating',
  templateUrl: './userrating.component.html',
  styleUrls: ['./userrating.component.css']
})
export class UserratingComponent {
  @Input() userID: string = '';
  @Input() rating: string = '';
  @Input() comment: string = '';
  
  getStars(num: string) {
    const stars = [];
    const numOfStart = parseInt(num);
    Math.round(numOfStart);
    for(let i = 0; i < numOfStart; i++) {
      stars.push(i);
    }
    return stars;
  }
  
}
