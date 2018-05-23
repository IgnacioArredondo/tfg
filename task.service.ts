import { Injectable } from '@angular/core';
import { Task } from './task';
import { Http, Headers} from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../environments/environment';
import { AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';


@Injectable()
export class TaskService {

  private api: string = "/tasks";

  constructor(private http: AuthHttp, private authenticationService: AuthenticationService) { }

  save(data: Task): Promise<Task>{
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


  update(id, data: Task): Promise<Task>{
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

  get(id: string): Promise<Task>{
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


    getAll(): Promise<Task[]>
    {
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

    getOverdueTaskDashboard(): Promise<Task[]>
    {
     return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/overduetask")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });
    }

    getTodoTaskDashboard(): Promise<Number>
        {
     return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/todotask")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });
    }

    getProjectTasks():Promise<any>
    {

      return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/taskproject")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });

    }
    getByUser(): Promise<Task[]>
    {
     return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/user-tasks")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });
    }

    getByUserDashboard(): Promise<Task[]>
    {
     return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + "/dashboard")
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
           }, (err) => {
          reject(err);
        });
      });
    }

    checkTaskName(taskname: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiEndpoint + this.api + '/checktaskname?name=' + taskname)
      .map(res => res.json()).subscribe (res => {
          resolve(true);
      }, (err) => {
          reject(false);
      });
  });
}



}
