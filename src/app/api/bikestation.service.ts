import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BikeStationService {

    baseUrl = "http://localhost:8080/api/";
    constructor(private http: HttpClient) { }
    getAllCity(): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "all", { observe: 'response' });
    }
    getRennesCityData(): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=etat-des-stations-le-velo-star-en-temps-reel", { observe: 'response' });
    }
    post(bikeStations) {
        return this.http.post<any>(
            this.baseUrl + "bikestation/upload", bikeStations, { observe: 'response' });

    }
    searchHospitalByCityName(cityName): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "bikr/search/" + cityName, { observe: 'response' });
    }

}
