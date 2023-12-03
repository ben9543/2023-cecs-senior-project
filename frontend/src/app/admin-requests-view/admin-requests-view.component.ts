import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';
import { AuthService } from '../auth.service';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-admin-requests-view',
  templateUrl: './admin-requests-view.component.html',
  styleUrls: ['./admin-requests-view.component.css']
})
export class AdminRequestsViewComponent {
  requestspotnames: any;
  userData!: UserData;
  constructor(private studyspotService: StudyspotService, private authService: AuthService) { }
  
  ngOnInit(){
    this.userData = this.authService.getUserData();
    this.loadStudySpotData();
  }

  private loadStudySpotData() {
    this.studyspotService.getRequestedNames()
      .subscribe((data: any) => {
        this.requestspotnames = data.data;
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }

}
