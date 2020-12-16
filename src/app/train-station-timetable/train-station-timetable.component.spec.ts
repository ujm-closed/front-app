import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainStationTimetableComponent } from './train-station-timetable.component';

describe('TrainStationTimetableComponent', () => {
  let component: TrainStationTimetableComponent;
  let fixture: ComponentFixture<TrainStationTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainStationTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainStationTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
