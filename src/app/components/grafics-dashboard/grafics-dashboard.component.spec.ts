import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficsDashboardComponent } from './grafics-dashboard.component';

describe('GraficsDashboardComponent', () => {
  let component: GraficsDashboardComponent;
  let fixture: ComponentFixture<GraficsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
