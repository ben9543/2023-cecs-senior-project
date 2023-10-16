import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-studyspot',
  templateUrl: './studyspot.component.html',
  styleUrls: ['./studyspot.component.css']
})
export class StudyspotComponent {
  @Input() name: string = '';
  @Input() rating: number = 0;
  @Input() imageUrl: string = '../assets/spots/Spot1.jpeg';
  
  username: string = '';
  
  liked: boolean = false;

  getStars(num: number) {
    const stars = [];
    Math.round(num);
    for(let i = 0; i < num; i++) {
      stars.push(i);
    }
    return stars;
  }

  constructor(private router: Router, private studyspotService: StudyspotService, private authService: AuthService) { }

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
    this.authService.userData$.subscribe((userData) => {
      this.username = userData.user_name;
      console.log("userData in studyspot", userData);
    });
    this.fetchLikedState();
  }

  onCardClick(data: any) {
    this.router.navigate(['/studyspot-view'], { queryParams: { name: data.name } });
  }

  toggleLike() {
    if (this.liked) {
      // User has already liked it, so remove the like
      this.liked = false;
      this.studyspotService.unlikeCard(this.name, this.username); 
    } else {
      // User liked it for the first time
      this.liked = true;
      this.studyspotService.likeCard(this.name, this.username);
    }
  }

  fetchLikedState() {
    // Use your API service to fetch the liked state from the API
    this.studyspotService.getLikedState(this.name, this.username).subscribe((response) => {
      this.liked = response.liked; 
    });
  }
}
