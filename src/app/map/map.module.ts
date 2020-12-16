import { environment } from './../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [MapComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        BrowserModule,
        MatCardModule
        // AgmCoreModule.forRoot({
        //     apiKey: environment.gapi
        // })
    ],
    exports: [
        MapComponent
    ]
})
export class MapModule { }