import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudyspotService } from '../studyspot.service';

@Component({
  selector: 'app-studyspot',
  templateUrl: './studyspot.component.html',
  styleUrls: ['./studyspot.component.css']
})
export class StudyspotComponent {
  @Input() name: string = '';
  @Input() rating: number = 0;
  @Input() imageUrl: string = '../assets/spots/Spot1.jpeg';
  
  getStars(num: number) {
    const stars = [];
    Math.round(num);
    for(let i = 0; i < num; i++) {
      stars.push(i);
    }
    return stars;
  }

  constructor(private router: Router, private studyspotService: StudyspotService) { }

  ngOnInit() {
    this.studyspotService.getStudyspotByNameWithReviews(this.name).subscribe(
      (data: any) => {
        this.rating = data.data.studyspot_rating;
        console.log("studyspot rating", this.rating);
      },
      error => {
        console.error('Error fetching StudySpot details:', error);
      }
    );
  }

  onCardClick(data: any) {
    this.router.navigate(['/studyspot-view'], { queryParams: { name: data.name } });
  }
}
