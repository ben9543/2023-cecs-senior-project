import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): void {
    this.dialog.open(ConfirmationDialogComponent);
  }
}
