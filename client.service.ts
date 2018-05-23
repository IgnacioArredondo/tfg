import { Injectable } from '@angular/core';
import { Client } from './client';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';
import { AuthHttp} from 'angular2-jwt';



@Injectable()
export class ClientService {

  private api: string = "/clients";


constructor(private http: AuthHttp, private authenticationService: AuthenticationService) { }


save(data: Client): Promise<Client>{
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


update(id, data: Client): Promise<Client>{
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



  get(id: string): Promise<Client>{
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


   getAll(): Promise<Client[]>{
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


    checkClientName(clientname: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get(environment.apiEndpoint + this.api + '/checkclientname?name=' + clientname )
        .map(res => res.json()).subscribe (res => {
            resolve(true);
        }, (err) => {
            reject(false);
        });
    });
  }

     checkClientNameOnUpdate(clientname: string,clientId: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        this.http.get(environment.apiEndpoint + this.api + '/checkclientname?name=' + clientname + '&id=' + clientId )
        .map(res => res.json()).subscribe (res => {
            resolve(true);
        }, (err) => {
            reject(false);
        });
    });
  }



}
