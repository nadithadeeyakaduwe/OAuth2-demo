import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiService: ApiServiceService, private router: Router) { }

  ngOnInit() {
  }

  getPost() {
    window.location.href = this.apiService.getAuthCode();
  }
}
