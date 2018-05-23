import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';
import { AuthHttp} from 'angular2-jwt';

interface IUsernameEmailValidator {
}
@Injectable()
export class UserService {
  private api: string = "/users";

   constructor(private http: AuthHttp, private authenticationService: AuthenticationService) { }

   getAll(): Promise<User[]>{
     // add authorization header with jwt token
     return new Promise((resolve, reject) => {
       this.http.get(environment.apiEndpoint + this.api)
         .map(res => res.json())
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });
     });
   }

   get(id: string): Promise<User>{
     return new Promise((resolve, reject) => {
         this.http.get(environment.apiEndpoint + this.api + '/' + id)
           .map(res => res.json())
           .subscribe(res => {
             resolve(res)
         }, (err) => {
           reject(err);
         });
     });
   }

   save(data): Promise<User>{
     return new Promise((resolve, reject) => {
         this.http.post(environment.apiEndpoint + this.api, data)
           .map(res => res.json())
           .subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
     });
   }

   update(id, data: User): Promise<User>{
     return new Promise((resolve, reject) => {
         this.http.put(environment.apiEndpoint + this.api + '/' + id, data)
           .map(res => res.json())
           .subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
     });
   }

   delete(id: string){
     return new Promise((resolve, reject) => {
         this.http.delete(environment.apiEndpoint + this.api + '/' + id)
           .subscribe(res => {
             resolve(res);
           }, (err) => {
             reject(err);
           });
     });
   }

   checkEmailOnUpdate(email: string, userId: string): Promise<boolean>{
     return new Promise((resolve, reject) => {
       this.http.get(environment.apiEndpoint + this.api + '/checkemail?email=' + email + '&userId=' + userId)
           .map(res => res.json()).subscribe(res => {
             resolve(true);
           }, (err) => {
             reject(false);
           });
         });
   }

   changePassword(data: any): Promise<boolean> {
     return new Promise((resolve, reject) => {
       this.http.post(environment.apiEndpoint + this.api + '/changepassword', data)
           .map(res => res.json()).subscribe(res => {
             resolve(true);
           }, (err) => {
             reject(false);
           });
         });
   }


}
