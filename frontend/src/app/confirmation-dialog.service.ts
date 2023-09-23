import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openPasswordResetConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Password Reset Email',
        dialogMessage: 'Email sent! Check your inbox for the password reset link.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Password reset confirmed.');
        // Implement your password reset logic here
      } else {
        console.log('Password reset cancelled.');
      }
    });
  }

  openSettingUpdateConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Account Detail Updated',
        dialogMessage: 'You have made changes to your settings. Log in again to see the changes.',
      },
    });
  }
}