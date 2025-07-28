import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomMatPaginatorIntl } from './custom-mat-paginator-intl';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    MatPaginatorModule,MatFormFieldModule,
    MatSelectModule,MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() totalElements: number = 0;
  @Input() ItemName: string = "";
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 20, 50];

  @Output() pageChange = new EventEmitter<PageEvent>();

  getTotalElements(): number {
    return this.totalElements;
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageChange.emit(event);
  }
}
