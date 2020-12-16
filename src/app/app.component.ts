import { PublicEmitter } from './pub.service/public.emiters';
import { StationService } from './api/station.service';
import { AppConst } from './const/city.name';
import { CityService } from './api/city.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
// import { } from 'googlemaps';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'semantic-web-app';
  plotEmitterSubscription: any;
  trainStationPlots: any[] = [];
  bikeStationPlots: any[] = [];
  hospitalPlots: any[] = [];
  cityCoord: any;
  lat: number;
  long: number;
  googleMapType = 'satellite';
  // "@agm/core": "1.1.0",
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  constructor(private cityService: CityService, private stationService: StationService, private publicEmitter: PublicEmitter) { }
  keyword = 'name';
  data = [
  ];
  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  ngOnInit(): void {

    this.getCurrentLoaction();
    this.getAllCity();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.plotEmitterSubscription = this.publicEmitter.getemitplotEmitter()
      .subscribe(plots => this.onPlotEmitterTriggers(plots));
  }
  onPlotEmitterTriggers(plots) {
    if (plots.data.length > 0) {
      if (plots.type == "train") {
        plots.data.forEach((element, i) => {
          if (i == 0) {
            this.lat = element.coordination.split("(")[1].split(" ")[1].split(")")[0];
            this.long = element.coordination.split("(")[1].split(" ")[0]
          }
          this.trainStationPlots.push({ "label": element.stationLabel, "long": element.coordination.split("(")[1].split(" ")[0], "lat": element.coordination.split("(")[1].split(" ")[1].split(")")[0] });
        });
      }
      if (plots.type == "hospital") {
        plots.data.forEach((element) => {
          this.hospitalPlots.push(element.coordination);
        });
      }
      if (plots.type == "bikeStation") {
        plots.data.forEach(element => {
          this.bikeStationPlots.push(element.coordination);
        });
      }
    }
  }
  private getAllCity() {
    this.options = AppConst.cityNames;
    // this.data = AppConst.cityNames;
    // this.cityService.getAllCity()
    //   .subscribe(res => {
    //     this.filteredOptions = res.body;
    //     // this.filteredOptions = [{ name: "asd", label: "asd" }];
    //     debugger
    //   })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getCurrentLoaction() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
      })
    }
  }
  mapClick($event) {
    console.log($event);
  }
  searchOnClick() {
    let selectedSity = this.myControl.value;
    if (!selectedSity) {
      return;
    }
    this.publicEmitter.emitSearchOnClick(selectedSity);
  }

  radiusDragEnd($event) {

  }
  radiusChange(type, $event) {

  }
}
