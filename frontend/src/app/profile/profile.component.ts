import { Component } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  spotsRecent: Spot = [
    { name: "Club Area", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Horn Center", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "VEC Quad", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Library", rating: "5", imageUrl: "assets/spots/Spot1.jpeg"}
  ];

  spotsSuggested: Spot = [
    { name: "Student Sucess Center", rating: "5", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Starbucks", rating: "2", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Outpost", rating: "3", imageUrl: "assets/spots/Spot1.jpeg"},
    { name: "Nugget", rating: "1", imageUrl: "assets/spots/Spot1.jpeg"}
  ];

  constructor() {}

  ngOnInit() {}
}

type Spot = Array<{ name: string; rating: string; imageUrl: string; }>;
