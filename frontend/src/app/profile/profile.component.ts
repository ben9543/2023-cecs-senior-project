import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  spotsSuggested!: Array<string>;

  spotsRecent: string[]=[];

  selectedTabIndex: number = 0;
  tabs: number = 0;
  constructor(private studyspotService: StudyspotService) { 
    this.spotsRecent = this.studyspotService.getStudySpots();
    this.tabs = this.spotsRecent.length;
  }

  ngOnInit() {
    this.studyspotService.getCheckedInStudySpotsName().subscribe(
      (response) => {
        this.spotsSuggested = response.data;
        this.spotsSuggested = [...new Set(this.spotsSuggested)];
        this.spotsSuggested = this.spotsSuggested.slice(0, 8);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  // Function to handle tab changes
  tabChanged(event: number): void {
    this.selectedTabIndex = event;
  }

  // Function to select the previous tab
  selectPreviousTab(): void {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }

  // Function to select the next tab
  selectNextTab(): void {
    if (this.selectedTabIndex < this.tabs - 1) {
      this.selectedTabIndex++;
    }
  }

  selectedMightTabIndex: number = 0; 

  // Function to handle tab changes
  tabChangedmight(event: number): void {
    this.selectedMightTabIndex = event;
  }

  // Function to select the previous tab
  selectPreviousTabmight(): void {
    if (this.selectedMightTabIndex > 0) {
      this.selectedMightTabIndex--;
    }
  }

  // Function to select the next tab
  selectNextTabmight(): void {
    const mighttabs  = this.spotsSuggested.length; 
    if (this.selectedMightTabIndex < mighttabs - 1) {
      this.selectedMightTabIndex++;
    }
  }
}
