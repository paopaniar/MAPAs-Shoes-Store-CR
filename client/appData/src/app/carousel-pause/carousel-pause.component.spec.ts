import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselPauseComponent } from './carousel-pause.component';

describe('CarouselPauseComponent', () => {
  let component: CarouselPauseComponent;
  let fixture: ComponentFixture<CarouselPauseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselPauseComponent]
    });
    fixture = TestBed.createComponent(CarouselPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
