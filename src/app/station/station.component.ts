import { TrainStationTimetableComponent } from './../train-station-timetable/train-station-timetable.component';
import { StationService } from './../api/station.service';
import { PublicEmitter } from './../pub.service/public.emiters';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize: number;
  tableData: any[];
  searchOnClickSubscription: any;

  @Input() public stationData: any[];
  constructor(public dialog: MatDialog, private publicEmitter: PublicEmitter, private stationService: StationService) { }

  ngOnInit(): void {
    this.searchOnClickSubscription = this.publicEmitter.getSearchOnClickEmitter()
      .subscribe(selectedSity => this.onSearchClick(selectedSity));
    this.tableData = this.stationData;
  }
  onSearchClick(selectedSity: string) {
    this.refreshStationData();
  }
  onTrainStaionClick(stationItem) {
    this.openDialog(stationItem);
  }
  refreshStationData() {
    // this.countries = COUNTRIES
    //   .map((country, i) => ({ id: i + 1, ...country }))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.tableData = this.stationData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }
  openDialog(stationItem) {
    const dialogRef = this.dialog.open(TrainStationTimetableComponent, { data: stationItem });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
