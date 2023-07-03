import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosIndexComponent } from './pedidos-index.component';

describe('PedidosIndexComponent', () => {
  let component: PedidosIndexComponent;
  let fixture: ComponentFixture<PedidosIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosIndexComponent]
    });
    fixture = TestBed.createComponent(PedidosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
