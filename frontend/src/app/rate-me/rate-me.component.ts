import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import { UserData } from '../DTOs/user-data.dto';

@Component({
  selector: 'app-rate-me',
  templateUrl: './rate-me.component.html',
  styleUrls: ['./rate-me.component.css']
})
export class RateMeComponent {
  //comment: string = '';
  name: string = '';
  userData!: UserData;
  userID!: number;

  rate!:FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private studyspotService: StudyspotService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.rate = this.formBuilder.group({
      comment: ['', Validators.required]
    })
    this.userData = this.authService.getUserData();
    this.userID = this.userData?.user_id;
  }

  min: number = 0;
  max: number = 5;
  step: number = 1;
  finalValue: number = 0;

  onSubmit(){
    if (this.rate.valid && this.userID != -1) {
      const { comment } = this.rate.value;
      console.log("Comment: ", comment)
      console.log("Rate: ", this.finalValue)
      console.log("UserId: ", this.userID)
      
      this.studyspotService.add_review(this.userID, this.name, comment, this.finalValue).subscribe(
        () => {
            this.rate.reset()
            this.finalValue = 0
            this.router.navigate(['/studyspot-view'], { queryParams: { name: this.name } });
        },
        (error) => {
        }
      );
    }
  }
}
