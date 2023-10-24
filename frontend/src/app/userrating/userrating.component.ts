import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userrating',
  templateUrl: './userrating.component.html',
  styleUrls: ['./userrating.component.css']
})
export class UserratingComponent {
  @Input() userID: string = '';
  @Input() rating: string = '';
  @Input() comment: string = '';
  user_name: string = ''

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.userID != ''){
      this.userService.getUsernameById(parseInt(this.userID))
      .subscribe((data: string) => {
        this.user_name = data
      }, (error) => {
        console.error("Error fetching user data:", error);
      });
    }
  }

  getStars(num: string) {
    const stars = [];
    const numOfStart = parseInt(num);
    Math.round(numOfStart);
    for(let i = 0; i < numOfStart; i++) {
      stars.push(i);
    }
    return stars;
  }
}
