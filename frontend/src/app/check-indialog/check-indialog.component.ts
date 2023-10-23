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

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
  private router: Router, private authService: AuthService, private studyspotService: StudyspotService) { }

  ngOnInit(): void {
  }
  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValueNoise: number = 0;
  finalValueWifi: number = 0;
  finalValueCrowdiness: number = 0;

  checkIn(){
    this.router.navigate(['/home']);
  }

  onSubmit(){
  }

}
