import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {

    baseUrl = "http://localhost:8080/api/";
    constructor(private http: HttpClient) { }
    getAllCity(): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "all", { observe: 'response' });
    }

    searchHospitalByCityName(cityName): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "hospital/search/" + cityName, { observe: 'response' });
    }
    searchBikeStationByCityName(cityName): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "bikestation/search/" + cityName, { observe: 'response' });
    }

}
