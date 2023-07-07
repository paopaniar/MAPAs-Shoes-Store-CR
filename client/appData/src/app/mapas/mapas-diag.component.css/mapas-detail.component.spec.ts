import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasDiagComponent } from './mapas-diag.component';

describe('MapasDiagComponent', () => {
  let component: MapasDiagComponent;
  let fixture: ComponentFixture<MapasDiagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapasDiagComponent]
    });
    fixture = TestBed.createComponent(MapasDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
