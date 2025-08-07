import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPopupComponentComponent } from './auth-popup-component.component';

describe('AuthPopupComponentComponent', () => {
  let component: AuthPopupComponentComponent;
  let fixture: ComponentFixture<AuthPopupComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPopupComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthPopupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
