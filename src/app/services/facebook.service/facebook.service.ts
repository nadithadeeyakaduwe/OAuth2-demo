import { Injectable } from '@angular/core';
import { RestService } from '../rest.service/rest.service';
import { environment } from '../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService extends RestService {

  appid: string = environment.appID;
  appSecret: string = environment.appSecret;

  protected get headers(): HttpHeaders {
    const headerConfig = {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    };
    return new HttpHeaders(headerConfig);
  }

  private getUrlEncode(text: string) {
    return encodeURIComponent(text);
  }

  public getAuthCode() {
    const redirect_uri = this.getUrlEncode('http://localhost:4200/home/code');
    const scope = this.getUrlEncode('public_profile user_posts user_friends user_photos');
    return (`https://www.facebook.com/dialog/oauth?response_type=code&client_id=${this.appid}&redirect_uri=${redirect_uri}&scope=${scope}`);
  }

  public getAccessToken(authCode: string): Observable<any> {
    const redirect_uri = this.getUrlEncode('http://localhost:4200/home/code');
    // tslint:disable-next-line:max-line-length
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${this.appid}&redirect_uri=${redirect_uri}&client_secret=${this.appSecret}&code=${authCode}`;
    this.headers.set('Authorization', 'Basic ' + btoa(this.appid + ':' + this.appSecret));
    return this.get(url, this.headers);
  }

  public getUserAlbums(token: string): Observable<any> {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://graph.facebook.com/v2.8/me/albums';
    return this.get(url, header);
  }

}
