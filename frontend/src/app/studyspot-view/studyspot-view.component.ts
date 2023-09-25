import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-studyspot-view',
  templateUrl: './studyspot-view.component.html',
  styleUrls: ['./studyspot-view.component.css']
})
export class StudyspotViewComponent {

  studySpot: any;
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studySpot = JSON.parse(params['data']);
    });
  }

  checkIn() {
    // Route to the Check-In survey component
    this.router.navigate(['/check-in']);
  }

  rateMe() {
    // Route to the Rate Me survey component
    this.router.navigate(['/rate-me']);
  }
}