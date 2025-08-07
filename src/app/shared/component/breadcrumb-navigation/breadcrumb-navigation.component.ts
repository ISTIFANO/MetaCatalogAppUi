import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb-navigation',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './breadcrumb-navigation.component.html',
  styleUrl: './breadcrumb-navigation.component.css'
})
export class BreadcrumbNavigationComponent {
  @Input() items: { label: string; url?: string; icon?: string }[] = [];
}
