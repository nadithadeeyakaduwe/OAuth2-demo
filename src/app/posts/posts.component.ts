import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  authCode: string;
  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.authCode = params['code'];
      console.log(this.authCode);
      this.apiService.getAccessToken(this.authCode).subscribe((data) => {
        console.log(data.toString());
      });
    });
  }

}
