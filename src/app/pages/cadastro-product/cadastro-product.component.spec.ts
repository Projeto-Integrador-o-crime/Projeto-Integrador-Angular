import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProductComponent } from './cadastro-product.component';

describe('CadastroProductComponent', () => {
  let component: CadastroProductComponent;
  let fixture: ComponentFixture<CadastroProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
