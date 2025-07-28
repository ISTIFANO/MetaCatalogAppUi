// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../app/layout/sidebar/sidebar/sidebar.component';
import { HeaderComponent } from '../app/layout/header/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .main-content {
      margin-top: 60px;
      padding: 20px;
      transition: margin-left 0.3s ease;
    }
  `]
})
export class AppComponent {}