import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateCheckIn } from '../DTOs/create-checkin.dto';

@Component({
  selector: 'app-check-indialog',
  templateUrl: './check-indialog.component.html',
  styleUrls: ['./check-indialog.component.css']
})
export class CheckIndialogComponent {

  @Output() checkInSuccess: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
  private router: Router, private authService: AuthService, private studyspotService: StudyspotService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CheckIndialogComponent>,) { }

  ngOnInit(): void {
  }
  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValueNoise: number = 0;
  finalValueWifi: number = 0;
  finalValueCrowdiness: number = 0;

  checkIn(){
    const checkInData: CreateCheckIn = {
      user_id: this.data.user_id,
      studyspot_name: this.data.studyspot_name,
      survey_crowdednes_level: this.finalValueCrowdiness,
      survey_noise_level: this.finalValueNoise, 
      survey_wifi: this.finalValueWifi
    };

    this.studyspotService.checkInToStudySpot(checkInData).subscribe(
      (response) => {
      },
      (error) => {
        console.error('Check-in failed:', error);
        // Handle error if needed
      }
    );
  }
}
