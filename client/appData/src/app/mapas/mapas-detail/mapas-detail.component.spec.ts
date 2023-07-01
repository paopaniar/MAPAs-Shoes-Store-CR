import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasDetailComponent } from './mapas-detail.component';

describe('MapasDetailComponent', () => {
  let component: MapasDetailComponent;
  let fixture: ComponentFixture<MapasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapasDetailComponent]
    });
    fixture = TestBed.createComponent(MapasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
