import { CityService } from './../api/city.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-rdf',
  templateUrl: './create-rdf.component.html',
  styleUrls: ['./create-rdf.component.css']
})
export class CreateRdfComponent implements OnInit {
  cityUri = new FormControl();
  lat = new FormControl();
  long = new FormControl();
  cityLabel = new FormControl();
  cityComment = new FormControl();
  countryUri = new FormControl();
  constructor(private cityService: CityService) { }
  message = "";
  isSaved = false;
  ngOnInit(): void {
  }
  onSubmit() {
    let cityUri = this.cityUri.value;
    let cityLabel = this.cityLabel.value;
    let lat = this.lat.value;
    let long = this.long.value;
    let comment = this.cityComment.value;
    let countryUri = this.countryUri.value;
    let city = {
      uri: cityUri,
      label: cityUri,
      comment: comment,
      coordination: cityUri,
      country: countryUri,
      lat: lat,
      long_: long
    }
    this.cityService.save(city)
      .subscribe(res => {
        this.message = `${city.label} has been stored successfully to the tripple store`;
        this.isSaved = true;
        setTimeout(() => {
          this.isSaved = false;
        }, 15000);
      }, err => {
        this.message = `${city.label} has been stored successfully to the tripple store`;
        this.isSaved = true;
        setTimeout(() => {
          this.isSaved = false;
        }, 15000);
      })
  }
}
