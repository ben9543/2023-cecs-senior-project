import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
import { UserData } from '../DTOs/user-data.dto';
​
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favspotnames: any;
  userID!: number;
  userData!: UserData;
  constructor(private studyspotService: StudyspotService, private authService: AuthService) { }
  
  ngOnInit(){
    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
    this.loadStudySpotData();
  }
​
  private loadStudySpotData() {
    this.studyspotService.getAllLikedStudySpotsByUser(this.userID)
      .subscribe((data: any) => {
        this.favspotnames = data.data;
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }
}