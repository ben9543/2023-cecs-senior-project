import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import { PreviousReviews } from '../DTOs/previous-reviews.dto';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  
  userID: string = '';
  spots!: Spot | [];
  constructor(private authService: AuthService, private studySpotService: StudyspotService) {}

  ngOnInit() {
    this.authService.userData$.subscribe((userData) => {
      this.userID = userData.user_id;
      this.fetchReviewsByUserId(this.userID);
    });
  }

  selectedTabIndex: number = 0; // Initial selected tab index
  tabs: number = this.spots.length; // Replace with your tab data

  // Function to handle tab changes
  tabChanged(event: number): void {
    this.selectedTabIndex = event;
  }

  // Function to select the previous tab
  selectPreviousTab(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  // Function to select the next tab
  selectNextTab(): void {
    if (this.selectedTabIndex < this.tabs - 1) {
      this.selectedTabIndex++;
    }
  }
  
  fetchReviewsByUserId(userId: string): void {
    this.studySpotService.getReviewByUserId(userId).subscribe(
      (response) => {
        this.spots = response.data
        this.tabs = this.spots.length
      },
      (error) => {
        console.error('Error fetching reviews:', error);
        // Handle error - Display an error message or take appropriate action
      }
    );
  }
}

type Spot = Array<PreviousReviews>;