import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, CommonModule],
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  userToken: string = '';
  catalogId: string = '';
  showToken: boolean = false;
  isLoading: boolean = false;
  showSuccessMessage: boolean = false;
  errorMessage: string = '';

  toggleTokenVisibility(): void {
    this.showToken = !this.showToken;
  }

  onSubmit(): void {
    if (this.userToken && this.catalogId) {
      this.isLoading = true;
      this.errorMessage = '';
      this.showSuccessMessage = false;

      // Store in localStorage
      localStorage.setItem('token', this.userToken);
      localStorage.setItem('catalogId', this.catalogId);

  
      setTimeout(() => {
        try {
          console.log('Token:', this.userToken);
          console.log('Catalog ID:', this.catalogId);
          
          this.isLoading = false;
          this.showSuccessMessage = true;
    
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        } catch (error) {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de l\'enregistrement de la configuration';
        }
      }, 2000);
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis';
    }
  }

  resetForm(): void {
    this.userToken = '';
    this.catalogId = '';
    this.showToken = false;
    this.showSuccessMessage = false;
    this.errorMessage = '';
    
    localStorage.removeItem('token');
    localStorage.removeItem('catalogId');
  }

  ngOnInit(): void {
    const savedToken = localStorage.getItem('token');
    const savedCatalogId = localStorage.getItem('catalogId');
    
    if (savedToken) {
      this.userToken = savedToken;
    }
    
    if (savedCatalogId) {
      this.catalogId = savedCatalogId;
    }
  }
}