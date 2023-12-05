import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { RequestedSpotDTO } from '../DTOs/requested-spot.dto';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent {

  requested_spots!: Array<RequestedSpotDTO>;

  constructor(private adminService: AdminService){}

  ngOnInit(){
    this.getRequestedStudySpots();
  }
  getRequestedStudySpots(): void {
    this.adminService.getRequestedStudySpots().subscribe(
      (data: any) => {
        this.requested_spots = data.data;
        console.log('Requested study spots:', this.requested_spots);
      },
      (error) => {
        console.error('Error fetching requested study spots:', error);
      }
    );
  }
}
