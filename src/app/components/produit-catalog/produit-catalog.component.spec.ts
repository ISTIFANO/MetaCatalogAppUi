import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCatalogComponent } from './produit-catalog.component';

describe('ProduitCatalogComponent', () => {
  let component: ProduitCatalogComponent;
  let fixture: ComponentFixture<ProduitCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
