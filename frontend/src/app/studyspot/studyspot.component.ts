import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studyspot',
  templateUrl: './studyspot.component.html',
  styleUrls: ['./studyspot.component.css']
})
export class StudyspotComponent {
  @Input() name: string = '';
  @Input() rating: string = '';
  @Input() imageUrl: string = '';
  
  getStars(num: string) {
    const stars = [];
    for(let i = 0; i < parseInt(num); i++) {
      stars.push(i);
    }
    return stars;
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  onCardClick(data: any) {
    this.router.navigate(['/studyspot-view'], { queryParams: { data: JSON.stringify(data) } });
  }
}
