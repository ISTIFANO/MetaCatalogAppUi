import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-auth-popup',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './auth-popup-component.component.html',
  styleUrls: ['./auth-popup-component.component.css']
})
export class AuthPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<AuthPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { authUrl: string; website: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  openAuthLink(): void {
    window.open(this.data.authUrl, '_blank');
  }
}
