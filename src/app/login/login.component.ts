import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvaliedCredintials: Boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });
    this.isInvaliedCredintials = false;
  }

  private login(username: String,  Password: String) {
    if (username === 'SLIIT' && Password === '123') {
      return true;
    } else {
      return false;
    }
  }

  public onSubmit() {
    if (this.login(this.loginForm.get('username').value, this.loginForm.get('password').value)) {
      this.isInvaliedCredintials = false;
      this.router.navigate(['home']);
    } else {
      this.isInvaliedCredintials = true;
    }
  }

  public reset() {
    this.isInvaliedCredintials = false;
  }

}
