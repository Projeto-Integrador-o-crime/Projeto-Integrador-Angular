import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyloggedComponent } from './alreadylogged.component';

describe('AlreadyloggedComponent', () => {
  let component: AlreadyloggedComponent;
  let fixture: ComponentFixture<AlreadyloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyloggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlreadyloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
