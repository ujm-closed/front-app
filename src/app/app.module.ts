import { HospitalComponent } from './hospital/hospital.component';
import { StationComponent } from './station/station.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { MapModule } from './map/map.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer/footer.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BikeStationComponent } from './bike.station/bike.station.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { TrainStationTimetableComponent } from './train-station-timetable/train-station-timetable.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateRdfComponent } from './create-rdf/create-rdf.component';
@NgModule({
  entryComponents: [
    TrainStationTimetableComponent,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    StationComponent,
    HospitalComponent,
    BikeStationComponent,
    TrainStationTimetableComponent,
    CreateRdfComponent,
    // MapComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MapModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gapi
    }),
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    AutocompleteLibModule,
    MatTabsModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
