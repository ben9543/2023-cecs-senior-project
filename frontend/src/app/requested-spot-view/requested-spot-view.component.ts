import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { StudyspotService } from '../studyspot.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { AdminService } from '../admin.service';
import { RequestedSpotDTO } from '../DTOs/requested-spot.dto';
import { APIResponse } from '../DTOs/TypicalAPIResponse.dto';

@Component({
  selector: 'app-requested-spot-view',
  templateUrl: './requested-spot-view.component.html',
  styleUrls: ['./requested-spot-view.component.css']
})
export class RequestedSpotViewComponent implements OnInit{

  requestedSpot!: RequestedSpotDTO;
  name: string= '';
  username: string='';

  request!: FormGroup;
  universities: [] | undefined;
  strong_wifi: boolean = false;
  in_door: boolean = false;
  power_outlet: boolean = false;
  ada: boolean = false;
  easy_to_find: boolean = false;

  attributeList: string[] = ['WiFi', 'Power', 'ADA Accessible', 'Indoor', 'Easy to find'];
  userID: string = '';
  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder, private adminService: AdminService, private studySpotService: StudyspotService, private confirmationDialogService: ConfirmationDialogService, private userService: UserService) { }

  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValueNoise: number = 0;
  finalValueCrowdiness: number = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];

      this.adminService.getRequestedStudySpotByName(this.name).subscribe(
        (data: any) => {
          this.requestedSpot = data.data;
          this.finalValueCrowdiness = this.requestedSpot.request_crowdedness_level;
          this.finalValueNoise = this.requestedSpot.request_noise_level;
          this.initializeForm();
          this.userService.getUsernameById(this.requestedSpot.user_id).subscribe(
            (data: any) => {
              this.username = data;
            }
          )
        },
        error => {
          console.error('Error fetching StudySpot details:', error);
        }
      );
    });
  }

  initializeForm(): void {
    this.request = this.formBuilder.group({
      university: [this.requestedSpot.university_name, Validators.required],
      location: [this.requestedSpot.request_location, Validators.required],
      comments: [this.requestedSpot.request_reason, Validators.required],
      image: [''],
      studyspot_name: [this.name, Validators.required]
    });
  }

  onSubmit(): void {
    this.adminService.approveStudyspot(this.requestedSpot).subscribe(
      (data: any) => {
        if(data.result){
          this.router.navigate(['/admin-home']);
          this.confirmationDialogService.requestedSpotIsApproved();
        }
      },
      error => {
        console.error('Error Approving Requested Spot:', error);
      }
    );
  }

  onReject(): void {
    if (this.request.valid) {}
  }

  convertAttributesToBoolean(): void{
    const fturs = this.request.value.features;

    if( fturs.includes('WiFi')){
      this.strong_wifi = true;
    }
    if(fturs.includes('Power')){
      this.power_outlet = true;
    }
    if(fturs.includes('ADA Accessible')){
      this.ada = true;
    }
    if(fturs.includes('Indoor')){
      this.in_door = true;
    }
    if(fturs.includes('Easy to find')){
      this.easy_to_find = true;
    }
  }
}
