import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  authCode: string;
  constructor(private route: ActivatedRoute, private apiService: ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.authCode = '';
    this.route.queryParams.subscribe(params => {
      this.authCode = params['code'];
      // console.log(this.authCode);
      const data = this.apiService.getAccessToken(this.authCode);
      data.subscribe((data1) => {
        // this.apiService.getUserAlbums(data.toString()).subscribe((albums) => {
          // this.router.navigate(['/home/code']);
          console.log(data1.toString());
        // });
        // console.log('done' + data);
      });
    });
  }

}
