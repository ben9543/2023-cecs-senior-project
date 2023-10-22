import { Component, OnInit, Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-check-indialog',
  templateUrl: './check-indialog.component.html',
  styleUrls: ['./check-indialog.component.css']
})
export class CheckIndialogComponent {

  name: string = '';
  userID: number = -1;
  // for storing survey responses
  crowdiness: number = 0;
  wifi: number = 0;
  noise: number = 0;

  checkIn!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private route: ActivatedRoute, private formBuilder: FormBuilder, 
  private router: Router, private authService: AuthService, private studyspotService: StudyspotService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.checkIn = this.formBuilder.group({
      crowdiness: ['', Validators.required],
      wifi: ['', Validators.required],
      noise: ['', Validators.required]
    });
    this.authService.userData$.subscribe((userData) => {
      this.userID = userData.user_id;
      console.log("userData in studyspot", userData);
    });
  }
  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValue: number = 0;

  onSubmit(){
    if (this.checkIn.valid && this.userID != -1) {
      const { comment } = this.checkIn.value;
      console.log("Rate: ", this.finalValue)
      console.log("UserId: ", this.userID)
    }
  }

}
