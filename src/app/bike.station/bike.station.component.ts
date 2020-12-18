import { BikeStationService } from './../api/bikestation.service';
import { PublicEmitter } from './../pub.service/public.emiters';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bike-station',
  templateUrl: './bike.station.component.html',
  styleUrls: ['./bike.station.component.css']
})
export class BikeStationComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize: number;
  tableData: any[];
  searchOnClickSubscription: any;

  @Input() public bikeStationData: any[];
  constructor(private publicEmitter: PublicEmitter,
    private bikeStationService: BikeStationService
  ) { }

  ngOnInit(): void {
    this.searchOnClickSubscription = this.publicEmitter.getSearchOnClickEmitter()
      .subscribe(selectedSity => this.onSearchClick(selectedSity));
    this.tableData = this.bikeStationData;
  }
  onSearchClick(selectedSity: string) {
    this.refreshBikeStationData();
  }

  refreshBikeStationData() {
    // this.countries = COUNTRIES
    //   .map((country, i) => ({ id: i + 1, ...country }))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.tableData = this.bikeStationData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }
}
