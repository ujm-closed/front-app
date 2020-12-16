import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }
  getStatus(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.baseUrl, { observe: 'response' });
  }
  stopCommand(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.baseUrl, { observe: 'response' });
  }
  startCommand(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      this.baseUrl, { observe: 'response' });
  }
  downloadImage(key: any): Observable<HttpResponse<any>> {
    let p = new HttpParams();
    p = p.append('file', key);
    return this.http.get<any>(
      this.baseUrl + "s3/download", { params: p, observe: 'response' });
  }
  downloadFilev(key: string): Observable<any> {
    let p = new HttpParams();
    p = p.append('file', key);
    return this.http.get(this.baseUrl + "s3/download",
      { params: p, responseType: 'blob' as 'json' });
  }
  sendNumberList(numList): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      this.baseUrl + "sqs/num_l", numList, { observe: 'response' });
  }
}
