

import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WeatherApi {

    baseUrl = "http://localhost:8080/api/";
    constructor(private http: HttpClient) { }
    getAllCity(): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "all", { observe: 'response' });
    }
    getCity(cityName): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "city/" + cityName, { observe: 'response' });
    }

    postWeather(weather): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            this.baseUrl + "city/city/weather", weather, { observe: 'response' });
    }
    getRealTimeWeather(lat, long, cityName): Observable<HttpResponse<any>> {
        let headers = new HttpHeaders();
        let p = new HttpParams();
        p = p.append('q', cityName)
            .append("lat", lat)
            .append("lon", long)
            .append("callback", "test")
            .append("units", "\"metric\"")
            .append("mode", "json")
            ;
        headers = headers.set('x-rapidapi-key', "aea6de95edmshb5f6530eede1b3fp13a018jsnf1580e67bbe7")
            .set("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
            .set("useQueryString", "true");
        let weatherAPI = "https://community-open-weather-map.p.rapidapi.com/weather";
        return this.http.get<any>(weatherAPI, {
            params: p, headers: headers, observe: 'response'
        });
    }

}



// https://rapidapi.com/community/api/open-weather-map/endpoints
// var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

// req.query({
//     "q": "saint-etienne",
//     "lat": "45.4397",
//     "lon": "4.3872",
//     "callback": "test",
//     "id": "2172797",
//     "lang": "null",
//     "units": "\"metric\" or \"imperial\"",
//     "mode": "xml, html"
// });

// req.headers({
//     "x-rapidapi-key": "aea6de95edmshb5f6530eede1b3fp13a018jsnf1580e67bbe7",
//     "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
//     "useQueryString": true
// });
