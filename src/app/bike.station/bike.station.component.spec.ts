import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bike.StationComponent } from './bike.station.component';

describe('Bike.StationComponent', () => {
  let component: Bike.StationComponent;
  let fixture: ComponentFixture<Bike.StationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bike.StationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Bike.StationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
