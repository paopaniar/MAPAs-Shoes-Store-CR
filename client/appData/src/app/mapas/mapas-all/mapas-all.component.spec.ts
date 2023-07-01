import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasAllComponent } from './mapas-all.component';

describe('MapasAllComponent', () => {
  let component: MapasAllComponent;
  let fixture: ComponentFixture<MapasAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapasAllComponent]
    });
    fixture = TestBed.createComponent(MapasAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
