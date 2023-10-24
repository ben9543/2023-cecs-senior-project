import { Component } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  spotsRecent: Spot = [
    { name: "London", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Madrid", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Barcelona", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Vegas", rating: "5", imageUrl: "assets/spots/Spot1.jpeg"}
  ];

  spotsSuggested: Spot = [
    { name: "Portland", rating: "5", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Seattle", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Nashville", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Atlanta", rating: "1", imageUrl: "assets/spots/Spot1.jpeg"}
  ];

  constructor() {}

  ngOnInit() {}

  selectedTabIndex: number = 0; // Initial selected tab index
  tabs: number = this.spotsRecent.length; // Replace with your tab data

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

  selectedMightTabIndex: number = 0; // Initial selected tab index
  mighttabs: number = this.spotsSuggested.length; // Replace with your tab data

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
