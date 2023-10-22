import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-check-indialog',
  templateUrl: './check-indialog.component.html',
  styleUrls: ['./check-indialog.component.css']
})
export class CheckIndialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
