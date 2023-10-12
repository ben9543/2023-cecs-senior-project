import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AppCheckInDialog, {
      data: {
        animal: 'panda'
      }
    });
  }
}
