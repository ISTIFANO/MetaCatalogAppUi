// auth-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { NgForm, NgModel } from '@angular/forms';
@Component({
  standalone: true,
   imports: [MatDialogModule, MatButtonModule],
  selector: 'app-auth-popup',
  templateUrl: './auth-popup-component.component.html',
  styleUrls: ['./auth-popup-component.component.css']
})
export class AuthPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<AuthPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { authUrl: string, website: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  openAuthLink(): void {
    window.open(this.data.authUrl, '_blank');
  }
}