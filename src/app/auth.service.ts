import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/api/auth', {username: username, password: password})
      .pipe(
        map(result => {
          if(result.token){
            localStorage.setItem('access_token', result.token);
            return true;
          }
        else{
          return false;
        }
        })
      );
  }

  signup(email:string,password:string):Observable<boolean>{
    return this.http.post<{data: string}>('/api/signup', {email: email, password: password})
    .pipe(
      map(result => {
        if(result.data){
          console.log(result.data);
          return true;
        }
      else{
        return false;
      }
      })
    );
  }

  public checkToken():Observable<any>{
    return this.http.post<{data: string}>('/api/user', {token: this.getToken()})
    .pipe(
      map(result => {
        if(result.data){
          return result.data;
        }
      else{
        return false;
      }
      })
    );
  }

  public signindribbgle(){
    this.http.get('/api/dribbble');
  }
  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}