import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
import { PreviousCheckIn } from '../DTOs/previous-checked-in.dto';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  userId: number = -1;

  studySpots: Array<PreviousCheckIn> = [];

  isEmpty: boolean = false;

  constructor(private studyspotService: StudyspotService, private authService: AuthService) { 
  }
  
  ngOnInit(){
    this.authService.userData$.subscribe((userData) => {
      this.userId = userData.user_id;
      this.studyspotService.getCheckedInStudySpots(this.userId).subscribe((data: any)=> {
        this.studySpots = data.data;
        this.isEmpty = this.studySpots.length > 0? true: false;
      }, (error) =>{
        console.error("Error fetching study spot latest survey:", error);
      });
    });
  }
}