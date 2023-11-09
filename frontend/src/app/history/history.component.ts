import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  userId: number = -1;

  studySpots: string[];

  constructor(private studyspotService: StudyspotService, private authService: AuthService) { 
    this.studySpots = this.studyspotService.getStudySpots();
  }
  
  ngOnInit(){
    this.authService.userData$.subscribe((userData) => {
      this.userId = userData.user_id;
    });
  }
}