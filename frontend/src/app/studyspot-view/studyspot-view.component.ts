import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { StudyspotService } from '../studyspot.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckIndialogComponent } from '../check-indialog/check-indialog.component';
import { CreateCheckIn } from '../DTOs/create-checkin.dto';
import { AuthService } from '../auth.service';
import { PreviousCheckIn } from '../DTOs/previous-checked-in.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-studyspot-view',
  templateUrl: './studyspot-view.component.html',
  styleUrls: ['./studyspot-view.component.css']
})
export class StudyspotViewComponent {
  
  studySpot: any;
  name: string = '';
  reviews: any[] = [];
  lengthOfReviews: number = 4;
  userData!: UserData;
  user_id!: number;
  latest: PreviousCheckIn = {
    survey_id: '',
    studyspot_name: '',
    user_id: '',
    survey_crowdednes_level: 0,
    survey_noise_level: 0,
    survey_wifi: 0,
    survey_created_at: '',
    checked_out: false
  }

  isSpotAvailable: boolean = true;
  isCheckedIn: boolean = false;
  canFillTheSurvey: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private studyspotService: StudyspotService, private userService: UserService,
    private dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.userData = this.authService.getUserData();
      this.user_id = this.userData?.user_id;
      this.loadStudySpotData();
    });
  }

  private loadStudySpotData() {
    this.studyspotService.getStudyspotByNameWithReviews(this.name)
      .subscribe((data: any) => {
        this.studySpot = data.data;
        this.reviews = data.data.reviews;
        this.lengthOfReviews = data.data.reviews.length;
        this.studyspotService.getLatestcheckInToStudySpot(this.name).subscribe((data: any)=> {
          this.latest = data.data
          if(parseInt(this.latest.user_id) == this.user_id){
            this.isSpotAvailable = !this.isCheckInAllowed(this.latest.survey_created_at) || this.latest.checked_out
            this.isCheckedIn = !this.latest.checked_out;
          }
          else {
            console.error("U ID:", this.latest.user_id );
            if(this.isCheckInAllowed(this.latest.survey_created_at)){
                if(!this.latest.checked_out){
                  this.canFillTheSurvey = false;
                  this.isCheckedIn = !this.latest.checked_out;
                }
            }
          }
        }, (error) =>{
          console.error("Error fetching study spot latest survey:", error);
        });
      }, (error) => {
        console.error("Error fetching study spot data:", error);
      });
  }

  openDialog() {
    if(this.canFillTheSurvey){
      let dialogRef = this.dialog.open(CheckIndialogComponent,
        {data: {
          user_id: this.user_id,
          studyspot_name: this.name
        }});
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
    else{
       this.snackBar.open('Spot Is Taken', 'Close', { duration: 5000 });
    }
  }

  performCheckOut(): void {
    this.studyspotService.checkOutFromStudyspot(parseInt(this.latest.survey_id)).subscribe(
      () => {
        this.isSpotAvailable = true;
        this.isCheckedIn = false;
        this.router.navigate(['/studyspot-view'], { queryParams: { name: this.latest.studyspot_name } });
      },
      error => {
        console.error('Failed to check out survey', error);
      }
    );
  }

  rateMe() {
    // Route to the Rate Me survey component
    this.router.navigate(['/rate-me'], { queryParams: { name: this.name} });
  }
  
  // Use HostBinding to update the custom property
  @HostBinding('style.--number-of-reviews') get numberOfReviewsProperty() {
    return this.lengthOfReviews <=2? 4: this.lengthOfReviews - 1;
  }

 isCheckInAllowed(dateTimeString: string) {
    // Convert the given date and time string to a Date object
    const givenDateTime = new Date(dateTimeString);
  
    // Create a new Date object for the current date and time
    const currentDateTime = new Date();
  
    // Add 2 hours to the given date and time
    const adjustedDateTime = new Date(givenDateTime.getTime() + (2 * 60 * 60 * 1000));
  
    // Check if the adjusted date and time is greater than the current date and time
    console.log(adjustedDateTime > currentDateTime)
    return adjustedDateTime > currentDateTime;
  }
}