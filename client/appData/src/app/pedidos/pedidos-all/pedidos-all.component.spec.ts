import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAllComponent } from './pedidos-all.component';

describe('PedidosAllComponent', () => {
  let component: PedidosAllComponent;
  let fixture: ComponentFixture<PedidosAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosAllComponent]
    });
    fixture = TestBed.createComponent(PedidosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
