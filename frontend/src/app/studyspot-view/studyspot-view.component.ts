import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { StudyspotService } from '../studyspot.service';

@Component({
  selector: 'app-studyspot-view',
  templateUrl: './studyspot-view.component.html',
  styleUrls: ['./studyspot-view.component.css']
})
export class StudyspotViewComponent {
  studySpot: any;
  name: string = '';
  reviews: any[] = [];
  lengthOfReviews: number = 4;
  constructor(private route: ActivatedRoute, private router: Router, private studyspotService: StudyspotService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.loadStudySpotData();
    });
  }

  private loadStudySpotData() {
    this.studyspotService.getStudyspotByNameWithReviews(this.name)
      .subscribe((data: any) => {
        this.studySpot = data.data;
        this.reviews = data.data.reviews;
        this.lengthOfReviews = data.data.reviews.length;
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }

  checkIn() {
    // Route to the Check-In survey component
    this.router.navigate(['/check-in']);
  }

  rateMe() {
    // Route to the Rate Me survey component
    this.router.navigate(['/rate-me'], { queryParams: { name: this.name} });
  }
  
  // Use HostBinding to update the custom property
  @HostBinding('style.--number-of-reviews') get numberOfReviewsProperty() {
    return this.lengthOfReviews <=2? 5: this.lengthOfReviews + 3;
  }
}