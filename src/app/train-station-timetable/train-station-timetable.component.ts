import { StationService } from './../api/station.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-train-station-timetable',
  templateUrl: './train-station-timetable.component.html',
  styleUrls: ['./train-station-timetable.component.css']
})
export class TrainStationTimetableComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private stationService: StationService) { }

  ngOnInit(): void {
  }
  getRealTimeDataSNCF() {
    this.stationService.getRealTimeTrainSNCF(this.data.branchCode)
      .subscribe(res => {
        debugger
      })
  }


}
