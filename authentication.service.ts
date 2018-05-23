import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Project } from './project';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../environments/environment';


@Injectable()
export class AuthenticationService {
    private api: string = "http://localhost:3000/auth";
    public token: string;
    public user: any;
    public pro:Project;
    private headers: Headers;
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) {
      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      if(localStorage.getItem('projectAuth') != null){
         sessionStorage.setItem('projectAuth', localStorage.getItem('projectAuth'));
       }
       //Extract user from token
       if (sessionStorage.getItem('projectAuth') != null) {
         this.extractUser();
       }

    }

    login(username: string, password: string, remember: boolean): Promise<boolean> {
      return new Promise((resolve, reject) => {
       this.http.post(this.api + '/login', JSON.stringify({ username: username, password: password }), {headers: this.headers})
            .map(res => res.json()).subscribe(res => {
              this.token = res.token;
              sessionStorage.setItem('projectAuth', this.token);
              if (remember){
                localStorage.setItem('projectAuth',  this.token);
              }
              this.extractUser();

              resolve(true);
          }, (err) => {
            reject(err);
          });
        });

    }

    register(user): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.post(this.api + '/register', user, {headers: this.headers})
            .map(res => res.json()).subscribe(res => {
                this.token = res.token;
                resolve(true);
            });
          });
    }

    sendEmail(username: string, email: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.post(this.api + '/sendemail', JSON.stringify({ name: username, sendTo: email, token: this.token }), {headers: this.headers})
            .map(res => res.json()).subscribe(res => {
                resolve(true);
            });
          });
    }

    confirm(token: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.put(this.api + '/confirm', JSON.stringify({ token: token }), {headers: this.headers})
            .map(res => res.json()).subscribe(res => {
                resolve(true);
            });
          });
    }


    checkUsername(username: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get(this.api + '/checkusername?username=' + username)
        .map(res => res.json()).subscribe (res => {
            resolve(true);
        }, (err) => {
            reject(false);
        });
    });
  }



  checkEmail(email: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.get(this.api + '/checkemail?email=' + email)
          .map(res => res.json()).subscribe(res => {
            resolve(true);
          }, (err) => {
            reject(false);
          });
        });
  }

  public extractUser(){
  if (sessionStorage.getItem('projectAuth')) {
    this.token = sessionStorage.getItem('projectAuth');
    let tokenDecode = this.jwtHelper.decodeToken(this.token);
    this.user = {
      "name": tokenDecode.name,
      "role": tokenDecode.role
    };
  }
}

  restorePassword(newPassword: string, token: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.post(this.api + '/restore-password', {newPassword: newPassword, token: token})
            .map(res => res.json()).subscribe(res => {
                resolve(true);
          });
        });
    }

isLoggedIn(){
  
  return this.token;
}

 isAdmin()
 {
   if (this.user['role'] == 'Admin') {
     return true;
   } else {
     return false;
   }
 }
  
   isDeveloper()
 {
   if (this.user['role'] == 'Developer') {
     return true;
   } else {
     return false;
   }
 }

 logout(): void {
      // clear token remove user from local storage to log user out
      this.token = undefined;
      localStorage.removeItem('projectAuth');
      sessionStorage.removeItem('projectAuth');
    }



}
