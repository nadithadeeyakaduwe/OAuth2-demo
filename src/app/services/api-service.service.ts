import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  appid: string = environment.appID;
  appSecret: string = environment.appSecret;

  constructor(private http: HttpClient) { }

  // private createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //   btoa(this.appid + ':' + this.appSecret));
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Access-Control-Allow-Origin', '*');
  // }

  private getUrlEncode(text: string) {
    return encodeURI(text);
  }

  getAuthCode() {
     return ('https://www.facebook.com/dialog/oauth?response_type=code&client_id=' + this.appid + '&redirect_uri='
      + this.getUrlEncode('https://localhost:4200/home/code') + '&scope=' +
      this.getUrlEncode('public_profile user_posts user_friends user_photos'));
  }

  getAccessToken(authCode: string) {
    const url = 'https://graph.facebook.com/oauth/access_token';

    const body = {
      'grant_type' : 'authorization_code',
      'client_id' : this.appid,
      'redirect_uri' : encodeURI ('https://localhost:4200/home/code'),
      'code' : authCode
    };

    console.log('body is: ' + JSON.stringify(body));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : 'Basic ' + btoa(this.appid + ':' + this.appSecret)
      })
    };


    return this.http.post(url, body, httpOptions);
  }


}
