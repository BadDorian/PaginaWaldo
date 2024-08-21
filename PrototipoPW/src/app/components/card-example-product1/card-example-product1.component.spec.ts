import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardExampleProduct1Component } from './card-example-product1.component';

describe('CardExampleProduct1Component', () => {
  let component: CardExampleProduct1Component;
  let fixture: ComponentFixture<CardExampleProduct1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardExampleProduct1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardExampleProduct1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
