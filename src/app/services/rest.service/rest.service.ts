import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  constructor(private http: HttpClient) { }

  protected get(url: string, headers: any): Observable<any> {
    return this.http.get(url, {headers: headers});
  }

  protected post(url: string, data: any, headers: any): Observable<any> {
    return this.http.post(url, data, {headers: headers});
  }

  protected put(url: string, data: any, headers: any): Observable<any> {
    return this.http.put(url, data, {headers: headers});
  }

  protected delete(url: string, headers: any): Observable<any> {
    return this.http.delete(url, {headers: headers});
  }
}

