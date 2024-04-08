import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTopComponent } from './carousel-top.component';

describe('CarouselTopComponent', () => {
  let component: CarouselTopComponent;
  let fixture: ComponentFixture<CarouselTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselTopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
