import { HospitalService } from './../api/hospital.service';
import { PublicEmitter } from './../pub.service/public.emiters';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize: number;
  tableData: any[];
  searchOnClickSubscription: any;

  @Input() public hospitalData: any[];
  constructor(private publicEmitter: PublicEmitter, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.searchOnClickSubscription = this.publicEmitter.getSearchOnClickEmitter()
      .subscribe(selectedSity => this.onSearchClick(selectedSity));
    this.tableData = this.hospitalData;
  }
  onSearchClick(selectedSity: string) {
    this.refreshHospitalData();
  }

  refreshHospitalData() {
    // this.countries = COUNTRIES
    //   .map((country, i) => ({ id: i + 1, ...country }))
    //   .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.tableData = this.hospitalData
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);

  }

}
