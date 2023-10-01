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
}

type Spot = Array<{ name: string; rating: string; imageUrl: string; }>;
