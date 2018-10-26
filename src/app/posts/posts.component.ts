import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FacebookService } from '../services/facebook.service/facebook.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  authCode: string;
  userName: string;
  ProfilePictureUrl: string;
  constructor(private route: ActivatedRoute, private apiService: ApiServiceService,
    private fbservice: FacebookService) { }

  ngOnInit() {
    this.authCode = '';
    this.route.queryParams.subscribe(params => {
      this.authCode = params['code'];
      this.apiService.getAccessToken(this.authCode).subscribe((accessData) => {
        this.fbservice.getUserPicture(accessData.access_token).subscribe((picture) => {
          this.fbservice.getUserName(accessData.access_token).subscribe((Name) => {
            this.userName = Name.name;
            this.ProfilePictureUrl = picture.data.url;
          });
        });
      });
    });
  }

}
