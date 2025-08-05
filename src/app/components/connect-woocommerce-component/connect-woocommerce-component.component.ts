import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthPopupComponent } from '../auth-popup-component/auth-popup-component.component';
import { SessionService } from '../../services/SessionService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-connect-woocommerce',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './connect-woocommerce-component.component.html',
  styleUrls: ['./connect-woocommerce-component.component.css']
})
export class ConnectWoocommerceComponent {
  websiteUrl = '';
  isLoading = false;
  errorMessage = '';

  private apiUrl = 'https://70cbfc41dbf5.ngrok-free.app/api/generate-auth-url';

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {}

  onSubmit(): void {
    if (!this.websiteUrl) {
      this.errorMessage = 'Please enter your WooCommerce website URL';
      return;
    }

    if (!/^https?:\/\//.test(this.websiteUrl)) {
      this.errorMessage = 'Please include http:// or https:// in your URL';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.sessionService.set('woocommerceWebsite', this.websiteUrl);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { website: this.websiteUrl };

    this.http.post<any>(this.apiUrl, body, { headers })
      .subscribe({
        next: response => {
          this.isLoading = false;
          if (response.auth_url) {
            this.showAuthPopup(response.auth_url, response.website);
          } else {
            this.errorMessage = response.error || 'Failed to generate authorization URL';
          }
        },
        error: err => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Error connecting to WooCommerce';
          console.error('Full error:', err);
        }
      });
  }

  private showAuthPopup(authUrl: string, website: string): void {
    this.dialog.open(AuthPopupComponent, {
      width: '500px',
      data: { authUrl, website }
    });
  }
}
