import { Injectable } from '@angular/core';
import { Project } from './project';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';
import { AuthHttp} from 'angular2-jwt';


@Injectable()
export class ProjectService {
  private api: string = "/projects";

  constructor(private http: AuthHttp) { }

  save(data: Project): Promise<Project>{
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


  update(id, data: Project): Promise<Project>{
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



  get(id: string): Promise<Project>{
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


   getAll(): Promise<Project[]>{
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

  getTodoProjectDashboard(): Promise<Number>
    {
     return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/todoproject")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });
    }

  checkProjectName(projectname: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + '/checkprojectname?name=' + projectname)
      .map(res => res.json()).subscribe (res => {
          resolve(true);
      }, (err) => {
          reject(false);
      });
  });
}





}
