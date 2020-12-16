import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StationService {

    baseUrl = "http://localhost:8080/api/";
    constructor(private http: HttpClient) { }
    getAllCity(): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "city/all", { observe: 'response' });
    }

    downloadImage(key: any): Observable<HttpResponse<any>> {
        let p = new HttpParams();
        p = p.append('file', key);
        return this.http.get<any>(
            this.baseUrl + "s3/download", { params: p, observe: 'response' });
    }

    sendNumberList(numList): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            this.baseUrl + "sqs/num_l", numList, { observe: 'response' });
    }
    searchStationByCityName(cityName): Observable<HttpResponse<any>> {
        return this.http.get<any>(
            this.baseUrl + "station/search/" + cityName, { observe: 'response' });
    }
    // http://doc.navitia.io/#second-step
    getRealTimeTrainSNCF(areaCode): Observable<HttpResponse<any>> {
        let todayDate = new Date();
        // let date = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
        // let time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
        let preparedDateTime = todayDate.getFullYear() + (todayDate.getMonth() + 1) + todayDate.getDate()
            + "T" + todayDate.getHours() + todayDate.getMinutes() + todayDate.getSeconds();
        // 20201206T220714

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', environment.sncf);
        // .set('Content-Type', 'application/json; charset=utf-8');
        // stop_area:OCE:SA:87391003
        let sncfUrl = "https://api.sncf.com/v1/coverage/sncf/stop_areas/" + areaCode + "/departures?datetime=" + preparedDateTime;
        return this.http.get<any>(sncfUrl, { headers: headers, observe: 'response' });
    }
}
