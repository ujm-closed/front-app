import { StationService } from './../api/station.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-train-station-timetable',
  templateUrl: './train-station-timetable.component.html',
  styleUrls: ['./train-station-timetable.component.css']
})
export class TrainStationTimetableComponent implements OnInit {

  realTimeData: any[] = [];
  realTimeDataFiltered: any[] = [];
  page = 1;
  pageSize = 4;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private stationService: StationService) { }

  ngOnInit(): void {
    this.getRealTimeDataSNCF();
  }
  getRealTimeDataSNCF() {
    debugger;
    this.stationService.getRealTimeTrainSNCF(this.data.branchCode)
      .subscribe(res => {
        debugger
        this.realTimeData = res.body.departures;
      })
  }
  refreshRealTimeTableData() {
    this.realTimeDataFiltered = this.realTimeData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }


}
