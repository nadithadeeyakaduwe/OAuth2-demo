import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  appid: string = environment.appID;
  appSecret: string = environment.appSecret;

  constructor(private http: HttpClient) { }

  protected get headers(): HttpHeaders {
    const headerConfig = {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };
    // if token needed --> headerConfig['Authorization'] = 'token';
    return new HttpHeaders(headerConfig);
  }

  private getUrlEncode(text: string) {
    return encodeURIComponent(text);
  }

  getAuthCode() {
    const redirect_uri = this.getUrlEncode('https://localhost:4200/home/code');
    const scope = this.getUrlEncode('public_profile user_posts user_friends user_photos');
    return (`https://www.facebook.com/dialog/oauth?response_type=code&client_id=${this.appid}&redirect_uri=${redirect_uri}&scope=${scope}`);
  }

  getAccessToken(authCode: string): Observable<any> {
    const redirect_uri = this.getUrlEncode('https://localhost:4200/home/code');
    // tslint:disable-next-line:max-line-length
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${this.appid}&redirect_uri=${redirect_uri}&client_secret=${this.appSecret}&code=${authCode}`;
    this.headers.append('Authorization', 'Basic ' + btoa(this.appid + ':' + this.appSecret));
    return this.http.get(url);
  }

  getData(token: string): Observable<any> {
    const url =  `https://graph.facebook.com/v2.8/me?fields=name`;
    this.headers.set('Authorization', 'Bearer ' + token);
    return this.http.get(url);
  }


}
