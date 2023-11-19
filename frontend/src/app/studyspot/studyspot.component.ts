import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
import { UserData } from '../DTOs/user-data.dto';
@Component({
  selector: 'app-studyspot',
  templateUrl: './studyspot.component.html',
  styleUrls: ['./studyspot.component.css']
})
export class StudyspotComponent {
  @Input() name: string = '';
  @Input() rating: number = 0;
  @Input() imageUrl: string = '../assets/spots/Spot1.jpeg';
  
  userID!: number;
  userData!: UserData;
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
        this.imageUrl = `https://studyspot-123.s3.us-west-1.amazonaws.com/${this.name}.jpg`;
      },
      error => {
        console.error('Error fetching StudySpot details:', error);
      }
    );

    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
    
    this.studyspotService.getLikedState(this.name, this.userID).subscribe((response) => {
      this.liked = response.liked; 
    });
  }

  onCardClick(data: any) {
    this.studyspotService.addStudySpotName(this.name);
    this.router.navigate(['/studyspot-view'], { queryParams: { name: data.name } });
  }

  likeCard() {
    this.studyspotService.likeCard(this.name, this.userID).subscribe(() => {
      this.liked = true;
    });
  }
  
  unlikeCard() {
    this.studyspotService.unlikeCard(this.name, this.userID).subscribe(() => {
      this.liked = false;
    });
  }

  toggleLike() {
    if (this.liked) {
      // User has already liked it, so remove the like
      this.liked = false;
      this.unlikeCard();
    } else {
      // User liked it for the first time
      this.liked = true;
      this.likeCard();
    }
  }
}
