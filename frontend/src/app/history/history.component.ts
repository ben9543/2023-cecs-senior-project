import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
import { PreviousCheckIn } from '../DTOs/previous-checked-in.dto';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  userID!: number;
  userData!: UserData;
  studySpots: Array<PreviousCheckIn> = [];

  isEmpty: boolean = false;

  constructor(private studyspotService: StudyspotService, private authService: AuthService) { 
  }
  
  ngOnInit(){
    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
    this.studyspotService.getCheckedInStudySpots(this.userID).subscribe((data: any)=> {
      this.studySpots = data.data;
      this.isEmpty = this.studySpots.length > 0? true: false;
    }, (error) =>{
      console.error("Error fetching study spot latest survey:", error);
    });
  }
}