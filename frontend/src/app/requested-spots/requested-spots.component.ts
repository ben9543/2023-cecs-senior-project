import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RequestedSpotDTO } from '../DTOs/requested-spot.dto';
import { StudyspotService } from '../studyspot.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-requested-spots',
  templateUrl: './requested-spots.component.html',
  styleUrls: ['./requested-spots.component.css']
})
export class RequestedSpotsComponent {
  @Input() name: string = '';
  imageUrl: string = '../assets/spots/RequestedSpot.png';
  username: string = '';

  requestedspot!: RequestedSpotDTO;

  constructor(private router: Router, private adminService: AdminService, private userService: UserService) { }

  ngOnInit() {
    this.adminService.getRequestedStudySpotByName(this.name).subscribe(
      (data: any) => {
        this.requestedspot = data.data;
        this.userService.getUsernameById(this.requestedspot.user_id).subscribe(
          (data: any) => {
            this.username = data;
          }
        )
      },
      error => {
        console.error('Error fetching StudySpot details:', error);
      }
    );
  }

  onCardClick() {
    this.router.navigate(['/requested-spot-view'], { queryParams: { name: this.name } });
  }
}
