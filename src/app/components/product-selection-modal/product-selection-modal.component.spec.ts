import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectionModalComponent } from './product-selection-modal.component';

describe('ProductSelectionModalComponent', () => {
  let component: ProductSelectionModalComponent;
  let fixture: ComponentFixture<ProductSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelectionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
