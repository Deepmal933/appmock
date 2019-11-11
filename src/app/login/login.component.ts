import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username: string;
  public password: string;
  public error: string;

  public signupemail: string;
  public signuppass:string;
  public message:string;

  constructor(private auth: AuthService, private router: Router,private activatedroute:ActivatedRoute) {

    var token = activatedroute.snapshot.queryParams.token;
    if(token){
      localStorage.setItem('access_token', token);
      this.router.navigate(['/app'])
    }


    if(auth.loggedIn){

      this.auth.checkToken().pipe(first()).subscribe(
        result=>this.router.navigate(['/app']),
        err=> this.error = "session expired"
        )    }
   }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['app']),
        err => this.error = 'Could not authenticate'
      );
  }

  public signup(){
    this.auth.signup(this.signupemail,this.signuppass)
    .pipe(first())
    .subscribe(
      result => this.message = "success",
      err => this.message = "signup failed"

    );
  }

  public dribbble(){
    var callbackURL = 'https://appmock.herokuapp.com/api/dribbble/callback'
    var cliendId = '341a75fea894f83b8c50444d94524ea1b4cd9c323ff9187aec4e3123b241f4c2'
    var url = 'https://dribbble.com/oauth/authorize?client_id='+cliendId+'&scope=public+upload&redirect_uri='+callbackURL;
    window.location.href = url;
  }}