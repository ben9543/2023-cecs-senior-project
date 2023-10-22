import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CheckIndialogComponent } from '../check-indialog/check-indialog.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(CheckIndialogComponent,
      {data: {name: 'test'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
