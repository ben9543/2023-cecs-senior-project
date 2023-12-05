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

  openPasswordChangedConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Password Changed',
        dialogMessage: 'You have changed your password. Log in again to see the changes.',
      },
    });
  }
  openAccountCreatedConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Account Created',
        dialogMessage: 'Thank you for signing up! Log in to exprience the full features of StudySpot.',
      },
    });
  }

  openRequestSubmittedConfirmation(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Request Submitted',
        dialogMessage: 'Thank you for submitting the request. We will take a look and get back to you with status update.',
      },
    });
  }

  requestedSpotIsApproved(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Request Approved',
        dialogMessage: 'You (Admin) have approved the requested StudySpot.',
      },
    });
  }

  requestedSpotIsRejected(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Request Rejected',
        dialogMessage: 'You (Admin) have rejected the requested StudySpot.',
      },
    });
  }

  spotAlreadyTaken(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Check-In Failed',
        dialogMessage: 'Opps..Check-In Faster Next Time',
      },
      disableClose: true
    });
  }
}
