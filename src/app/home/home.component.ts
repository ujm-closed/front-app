import { PublicEmitter } from './../pub.service/public.emiters';
import { StationService } from './../api/station.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchOnClickSubscription: any;
  trainStation: any[] = [];
  constructor(private stationService: StationService, private publicEmitter: PublicEmitter) { }

  ngOnInit(): void {
    this.searchOnClickSubscription = this.publicEmitter.getSearchOnClickEmitter()
      .subscribe(selectedSity => this.onSearchClick(selectedSity));
    // this.testSNCFService();
  }
  testSNCFService() {
    this.stationService.getRealTimeTrainSNCF("sad")
      .subscribe(res => {
        console.log(res)
        debugger
      })
  }
  onSearchClick(selectedSity: string) {
    this.getTratinStations(selectedSity);
  }
  ngOnDestroy() {
    this.searchOnClickSubscription.unsubscribe();
  }
  getTratinStations(selectedCity) {
    this.stationService.searchStationByCityName(selectedCity)
      .subscribe(res => {
        this.trainStation = res.body;
        this.publicEmitter.emitplotEmitter({ data: this.trainStation, type: "train" });
      }, error => {
        console.log(error)
      })
  }
  onTrainStaionClick() {
  }
  onBikeStaionClick() {
  }
  onHospitalClick() {
  }
}
//WEATHER
/*
var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

req.query({
  "q": "saint-etienne",
  "lat": "45.4397",
  "lon": "4.3872",
  "callback": "test",
  "id": "2172797",
  "lang": "null",
  "units": "\"metric\" or \"imperial\"",
  "mode": "xml, html"
});

req.headers({
  "x-rapidapi-key": "aea6de95edmshb5f6530eede1b3fp13a018jsnf1580e67bbe7",
  "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  "useQueryString": true
});
*/