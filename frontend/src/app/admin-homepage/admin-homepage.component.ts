import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent {
  reqspotnames: any;
  userId: number = -1;
  constructor(private studyspotService: StudyspotService, private authService: AuthService) { }
  
  ngOnInit(){
    this.authService.userData$.subscribe((userData) => {
      this.userId = userData.user_id;
    });
    this.loadStudySpotData();
  }
​
  private loadStudySpotData() {
    this.studyspotService.getAllLikedStudySpotsByUser(this.userId)
      .subscribe((data: any) => {
        this.reqspotnames = data.data;
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }
}
