import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProductComponent } from './contact-product.component';

describe('ContactProductComponent', () => {
  let component: ContactProductComponent;
  let fixture: ComponentFixture<ContactProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
