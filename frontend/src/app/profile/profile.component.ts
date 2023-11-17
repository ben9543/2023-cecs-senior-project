import { Component } from '@angular/core';
import { StudyspotService } from '../studyspot.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  spotsSuggested: Spot = [
    { name: "Portland", rating: "5", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Seattle", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Nashville", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Atlanta", rating: "1", imageUrl: "assets/spots/Spot1.jpeg"}
  ];

  spotsRecent: string[]=[];

  selectedTabIndex: number = 0;
  tabs: number = 0;
  constructor(private studyspotService: StudyspotService) { 
    this.spotsRecent = this.studyspotService.getStudySpots();
    this.tabs = this.spotsRecent.length;
  }

  ngOnInit() {}

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
  mighttabs: number = this.spotsSuggested.length; 

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
    if (this.selectedMightTabIndex < this.mighttabs - 1) {
      this.selectedMightTabIndex++;
    }
  }
}

type Spot = Array<{ name: string; rating: string; imageUrl: string; }>;
