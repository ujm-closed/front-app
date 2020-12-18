import { WeatherApi } from './../api/weather.api';
import { BikeStationService } from './../api/bikestation.service';
import { HospitalService } from './../api/hospital.service';
import { PublicEmitter } from './../pub.service/public.emiters';
import { StationService } from './../api/station.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonLDService } from './../pub.service/json-ld.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchOnClickSubscription: any;
  trainStation: any[] = [];
  hospitals: any[] = [];
  bikeStations: any[] = [];
  jsonLdTags: any[] = [];
  isWeather: boolean = false;
  weather: any = {};
  constructor(private stationService: StationService,
    private hospitalService: HospitalService,
    private jsonLDService: JsonLDService,
    private weatherApi: WeatherApi,
    private publicEmitter: PublicEmitter,
    private bikeStationService: BikeStationService) { }

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
    this.jsonLDService.removeStructuredData();
    this.jsonLdTags = [];
    this.getTratinStations(selectedSity);
    this.getHospital(selectedSity);
    this.getBikeStation(selectedSity);
    // this.getCityData(selectedSity);

  }
  getCityData(selectedCity) {
    this.weatherApi.getCity(selectedCity)
      .subscribe(res => {
        this.weatherApi.getRealTimeWeather("", 3, 2);
      })
  }
  ngOnDestroy() {
    this.searchOnClickSubscription.unsubscribe();
  }
  getTratinStations(selectedCity) {
    this.stationService.searchStationByCityName(selectedCity)
      .subscribe(res => {
        this.trainStation = res.body;
        this.getWeatherInfo(this.trainStation[0].coordination, selectedCity);
        this.prepareAndInsertStationJsonLd(this.trainStation);
        this.publicEmitter.emitplotEmitter({ data: this.trainStation, type: "train" });
      }, error => {
        console.log(error)
      })
  }
  getHospital(selectedCity) {
    this.hospitalService.searchHospitalByCityName(selectedCity)
      .subscribe(res => {
        this.hospitals = res.body;
        this.prepareAndInsertStationHospitalJsonLd(this.hospitals);
        this.publicEmitter.emitplotEmitter({ data: this.hospitals, type: "hospital" });
      }, error => {
        console.log(error)
      })
  }
  getBikeStation(selectedCity) {
    if (selectedCity == "Rennes") {
      this.bikeStationService.getRennesCityData()
        .subscribe(res => {
          let bikeStationRecords = [];
          let records = res.body.records;
          records.forEach(element => {
            bikeStationRecords.push({
              uri: "http://www.example.org/" + element.fields.coordonnees[0],
              label: element.fields.nom,
              recordedAt: element.fields.lastupdate,
              availability: element.fields.nombrevelosdisponibles,
              cityName: "RENNES",
              cityUri: "http://www.wikidata.org/entity/Q647",
              instanceOf: "<http://dbpedia.org/ontology/Station>",
              coordination: "Point(" + element.fields.coordonnees[1] + " " + element.fields.coordonnees[0] + ")",
              capacity: element.fields.nombreemplacementsactuels
            })
          });
          this.bikeStationService.post(bikeStationRecords)
            .subscribe(res => {
              debugger
            }, error => {
              console.log(error);
            })

        }, error => {

        })
    }
    this.hospitalService.searchBikeStationByCityName(selectedCity)
      .subscribe(res => {
        this.bikeStations = res.body;
        this.publicEmitter.emitplotEmitter({ data: this.bikeStations, type: "bikeStation" });
      }, error => {
        console.log(error)
      })
  }
  onTrainStaionClick() {
  }
  onBikeStaionClick() {
  }
  getWeatherInfo(coordination, cityName) {
    let lon = coordination.split("(")[1].split(" ")[0];
    let lat = coordination.split("(")[1].split(" ")[1].split(")")[0];
    this.weatherApi.getRealTimeWeather(lat, lon, "")
      .subscribe(res => {
      }, error => {
        debugger
        let first = error.error.text.split("test(")[1];
        let second = first.split(")")[0];
        let weatherJson = JSON.parse(second);
        let obj = {
          description: weatherJson.weather[0].description,
          airHumidity: weatherJson.main.humidity,
          temperatureValue: weatherJson.main.temp,
          feelsLike: weatherJson.main.feels_like,
          maxTemperature: weatherJson.main.temp_max,
          minTemperature: weatherJson.main.temp_min,
          recordedAt: weatherJson.dt,
          weather_main: weatherJson.weather[0].main,
          mainPressure: weatherJson.main.pressure,
          id: weatherJson.id,
          visibiltyAhead: weatherJson.main.description,
          windSpeed: weatherJson.main.description,
          sun_rise: weatherJson.sys.sunrise,
          sun_set: weatherJson.sys.sunset,
        };
        this.isWeather = true;
        this.weather = obj;
        this.weatherApi.postWeather(obj)
          .subscribe(res => {
            debugger
          })
      });
  }

  prepareAndInsertStationJsonLd(data) {
    let stationSchema = [];
    data.forEach(element => {
      let schema =
      {
        "@context": "https://schema.org",
        "@type": "TrainStation",
        "name": element.stationLabel,

        "location": {
          "@type": "Place",
          "name": element.cityLabel,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": element.cityLabel,
            "addressRegion": "FR",
            "addressCountry": "FR"
          }
        },
        "identifier": element.stationUri,
        "branchCode": element.branchCode,
        "organizer": {
          "@type": "Organization",
          "name": "SNCF",
        },
        "Language": "French",
        "description": `${element.stationLabel} is an french railway station located in the city of ${element.cityLabel}`,
        "url": `https://www.google.com/search?q=${element.cityLable} ${element.stationLabel}`
      };
      stationSchema.push(schema);
      this.jsonLdTags.push(schema);
    });

    this.jsonLDService.removeStructuredData();
    this.jsonLDService.insertSchema(this.jsonLdTags);
  }
  prepareAndInsertStationHospitalJsonLd(data) {
    let hospitalSchema = [];
    data.forEach(element => {
      let schema =
      {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "name": element.label,
        "availableService": element.medicalSpecialty,
        "location": {
          "@type": "Place",
          "name": element.cityName,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": element.address,
            "addressRegion": "FR",
            "addressCountry": "FR"
          }
        },
        "image": element.uri,
        "identifier": element.uri,
        "branchCode": element.comment,
        "Language": "French",
        "description": `${element.comment} is an french hospital located in the city of ${element.cityName}`,
        "url": `https://www.google.com/search?q=${element.cityName} ${element.label}`
      };
      hospitalSchema.push(schema);
      this.jsonLdTags.push(schema);
    });
    // this.jsonLdTags.push(hospitalSchema);
    this.jsonLDService.removeStructuredData();
    this.jsonLDService.insertSchema(this.jsonLdTags);
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