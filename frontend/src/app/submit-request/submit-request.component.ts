import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { CreateRequestDTO } from '../DTOs/create-request.dto'
import { StudyspotService } from '../studyspot.service';
import { ConfirmationDialogService } from '../confirmation-dialog.service';
import { UserData } from '../DTOs/user-data.dto';
import { HttpClient } from '@angular/common/http';
import { S3Service } from '../s3.service';

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent {
  request !: FormGroup;
  selectedFile!: File;
  universities: [] | undefined;
  strong_wifi: boolean = false;
  in_door: boolean = false;
  power_outlet: boolean = false;
  ada: boolean = false;
  easy_to_find: boolean = false;

  spotNamesFromJSON!: string[];
  spotNamessFromDB!: string[] ;
  availableSpotNames!: string[];
  spotNamessFromReqDB!: string[];

  attributeList: string[] = ['WiFi', 'Power', 'ADA Accessible', 'Indoor', 'Easy to find'];
  userData!: UserData;
  userID!: number;
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private studySpotService: StudyspotService, private confirmationDialogService: ConfirmationDialogService, private s3Service: S3Service) { }

  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValueNoise: number = 0;
  finalValueCrowdiness: number = 0;

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
    this.request = this.formBuilder.group({
      features: [[], Validators.required],
      university: ['', Validators.required],
      location: ['', Validators.required],
      comments: ['', Validators.required],
      image: [''],
      studyspot_name: ['', Validators.required]
    });

    this.userService.getUniversityList().subscribe((universities: any) => {
      this.universities = universities.data;
    });
    this.http.get<any>('assets/Data/Studyspot_Names.json')
      .subscribe((response) => {
        this.spotNamesFromJSON = response;
        this.fetchCitiesFromDB();
    });

  }

  async fetchCitiesFromDB(): Promise<void> {
    try {
      const [studyspotNamesResponse, requestedNamesResponse] = await Promise.all([
        this.studySpotService.getStudyspotNames().toPromise(),
        this.studySpotService.getRequestedNames().toPromise()
      ]);
  
      this.spotNamessFromDB = studyspotNamesResponse.data;
      this.spotNamessFromReqDB = requestedNamesResponse.data;
  
      this.availableSpotNames = this.getAvailableCities();
    } catch (error) {
      console.error('Error fetching study spots:', error);
    }
  }

  getAvailableCities(): string[] {
    const citiesFromDB = this.spotNamessFromDB.map(item => item);
    const citiesFromReqDB = this.spotNamessFromReqDB.map(item => item);

    return this.spotNamesFromJSON.filter(city => !citiesFromDB.includes(city) && !citiesFromReqDB.includes(city));
  }

  async onSubmit(): Promise<void> {
    if (this.request.valid) {

      this.convertAttributesToBoolean();
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      try {
        const requestData: CreateRequestDTO= {
          user_id: this.userID.toString(),
          studyspot_name: this.request.value.studyspot_name,
          university_name: this.request.value.university,
          is_indoor: this.in_door,
          ada: this.ada,
          power_outlets: this.power_outlet,
          easy_to_find: this.easy_to_find,
          image_url: '',
          location: this.request.value.location,
          noise_level: this.finalValueNoise,
          crowdedness_level: this.finalValueCrowdiness,
          strong_wifi: this.strong_wifi,
          reason: this.request.value.comments
        };

        this.studySpotService.createRequest(requestData).subscribe(
          (response) => {
            this.router.navigate(['/home']);
            this.confirmationDialogService.openRequestSubmittedConfirmation();
            this.s3Service.uploadFileToS3(formData, this.request.value.studyspot_name);
          },
          (error) => {
            console.error('Error submitting request:', error);
            // Handle error
          }
        );
      }
      catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
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
