import { Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { StudyspotService } from '../studyspot.service';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateCheckIn } from '../DTOs/create-checkin.dto';
import { ConfirmationDialogService } from '../confirmation-dialog.service';

@Component({
  selector: 'app-reportdialog',
  templateUrl: './reportdialog.component.html',
  styleUrls: ['./reportdialog.component.css']
})
export class ReportdialogComponent {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private router: Router, private authService: AuthService, private studyspotService: StudyspotService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReportdialogComponent>, private confirmationDialogService: ConfirmationDialogService) { }

  Report(){
    
  }
}
