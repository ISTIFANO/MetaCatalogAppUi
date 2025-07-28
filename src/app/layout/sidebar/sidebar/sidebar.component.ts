// sidebar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SidebarService } from '../../../services/sidebarService'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = false;
  activeSubmenu: string | null = null;
  
  fakeProducts = [
    { id: 1, name: 'Produit 1' },
    { id: 2, name: 'Produit 2' },
    { id: 3, name: 'Produit 3' },
    { id: 4, name: 'Produit 4' },
  ];

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.sidebarService.isOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }

  closeSidebar(): void {
    this.sidebarService.close();
  }

  toggleSubmenu(submenu: string, event: Event): void {
    event.preventDefault();
    this.activeSubmenu = this.activeSubmenu === submenu ? null : submenu;
  }
 navigateToSettings(): void {
    this.router.navigate(['/connect-woocommerce']); 
    this.closeSidebar();
  }
  navigateToProducts(): void {
    this.router.navigate(['/produits']);
    this.closeSidebar();
  }
  onUserProfileClick(): void {
  localStorage.clear();
  console.log('Local storage cleared');
  // Optionally redirect the user, for example:
  this.router.navigate(['']);
}

}