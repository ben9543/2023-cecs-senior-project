import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  spots: Spot = [
    { name: "Japan", rating: "4", imageUrl: "assets/spots/Spot1.jpeg" },
    { name: "Uganda", rating: "3", imageUrl: "assets/spots/Spot1.jpeg" },
    { name: "Mexico", rating: "5", imageUrl: "assets/spots/Spot1.jpeg" },
    { name: "Canada", rating: "4", imageUrl: "assets/spots/Spot1.jpeg" }
  ];
  constructor() {}

  ngOnInit() {}
}
type Spot = Array<{ name: string; rating: string; imageUrl: string; }>;
