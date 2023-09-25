import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get dialogTitle(): string {
    return this.data.dialogTitle || 'Confirmation';
  }

  get dialogMessage(): string {
    return this.data.dialogMessage || 'Are you sure you want to proceed?';
  }
}
