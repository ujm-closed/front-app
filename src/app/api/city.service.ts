import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CityService {

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
    submitCity(cityName): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            this.baseUrl + "city/search", cityName, { observe: 'response' });
    }
    save(cityObj): Observable<HttpResponse<any>> {
        return this.http.post<any>(
            this.baseUrl + "city/save", cityObj, { observe: 'response' });
    }
}
