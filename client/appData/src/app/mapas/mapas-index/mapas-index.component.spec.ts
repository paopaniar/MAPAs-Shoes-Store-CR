import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasIndexComponent } from './mapas-index.component';

describe('MapasIndexComponent', () => {
  let component: MapasIndexComponent;
  let fixture: ComponentFixture<MapasIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapasIndexComponent]
    });
    fixture = TestBed.createComponent(MapasIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
