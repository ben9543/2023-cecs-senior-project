import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import { PreviousReviews } from '../DTOs/previous-reviews.dto';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  
  userID!: number;
  spots!: Spot | [];
  userData!: UserData;
  noReviews: boolean = false;
  constructor(private authService: AuthService, private studySpotService: StudyspotService) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
    this.fetchReviewsByUserId(this.userID);
  }

  selectedTabIndex = 0; // Initially selected tab index
  itemsPerPage = 4; // Number of items to display per page
  currentPage = 0; // Current page number

  // Function to handle tab changes
  tabChanged(event: number): void {
    this.selectedTabIndex = event;
  }

  get paginatedSpots(): any[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    return this.spots.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Function to handle the next page
  nextPage(): void {
    const totalPages = Math.ceil(this.spots.length / this.itemsPerPage);
    this.currentPage = (this.currentPage + 1) % totalPages;
  }

  // Function to handle the previous page if needed
  previousPage(): void {
    const totalPages = Math.ceil(this.spots.length / this.itemsPerPage);
    this.currentPage = (this.currentPage - 1 + totalPages) % totalPages;
  }
  
  fetchReviewsByUserId(userId: number): void {
    this.studySpotService.getReviewByUserId(userId).subscribe(
      (response) => {
        this.spots = response.data;
      },
      (error) => {
        this.noReviews = true;
      }
    );
  }
}

type Spot = Array<PreviousReviews>;