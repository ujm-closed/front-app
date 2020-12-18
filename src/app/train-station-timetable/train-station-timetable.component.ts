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
    this.stationService.getRealTimeTrainSNCF(this.data.branchCode)
      .subscribe(res => {
        this.realTimeData = res.body.departures;
        this.updateRealTimeDataTimeTable(this.realTimeData, this.data.stationUri);
      })
  }

  updateRealTimeDataTimeTable(data, uri) {
    let timeTable = [];
    data.forEach(element => {
      timeTable.push({
        stationUri: uri,
        stopPoint: element.stop_point.lable,
        commercialModes: element.stop_point.commercial_modes.name,
        transportMean: element.stop_point.physical_modes.name,
        timeTableDirection: element.display_informations.direction,
        arrivingTime: element.stop_date_time.base_arrival_date_time,
        departingTime: element.stop_date_time.base_departure_date_time,
        timeTableNetwork: element.display_informations.network,
        timeTableLabel: element.display_informations.label,
        tripId: element.route.direction.id
      })
    });
    this.stationService.postStation(timeTable)
      .subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
      })
  }

  refreshRealTimeTableData() {
    this.realTimeDataFiltered = this.realTimeData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }


}
