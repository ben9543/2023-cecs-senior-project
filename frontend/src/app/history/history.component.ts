import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  pastspotnames: any;
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
        this.pastspotnames = data.data;
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }
}