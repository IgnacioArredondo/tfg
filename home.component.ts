import { Component, ViewChild, Optional, OnInit } from '@angular/core';
import { MdMenuTrigger} from '@angular/material';
import { DragulaService} from 'ng2-dragula/ng2-dragula';
import { MdDialog, MdDialogRef} from '@angular/material';
import { DialogInputComponent } from '../dialog-input/dialog-input.component';
import { TaskService} from '../task.service';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { ResourceService  } from '../resource.service';
import { Resource} from '../resource';
import { Router } from '@angular/router';
import { Task } from '../task';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { UserService} from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { Globals} from '../globals';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    providers: [DragulaService]
})
export class HomeComponent {

    selected: string;
    public tasks: Task[];
    public users: User[];
    public user: string;
    public oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    public firstDate;
    public secondDate;

    constructor(translate: TranslateService,public router:Router,public globals:Globals,public authenticationService: AuthenticationService, private dragulaService: DragulaService,public userService:UserService, public mdDialog: MdDialog, private taskService: TaskService, ) {
    }

   ngOnInit(){
     this.user = this.authenticationService.user.name;
     this.getTasks();
     this.globals.title="Gestión";
   }
    getTasks() {

      this.taskService.getAll().then((data) => {
        this.tasks = data;
      }, (error) => {
        console.log(error);
      });
    }


    openDialog() {
      let dialog = this.mdDialog.open(DialogInputComponent);

      dialog.afterClosed()
        .subscribe(selection => {
          if (selection) {
            this.selected = selection;
          } else {

          }
        });
    }

    calculateDays(firstDate:Date,secondDate:Date):any{

        // The number of milliseconds in one day
          var ONE_DAY = 1000 * 60 * 60 * 24

          // Convert both dates to milliseconds
          var date1_ms = firstDate.getTime();
          var date2_ms = secondDate.getTime();

          // Calculate the difference in milliseconds
          var difference_ms = Math.abs(date1_ms - date2_ms)

          // Convert back to days and return
          var result= Math.round(difference_ms/ONE_DAY);
          console.log(result);
          return result;

  }
logout(){
    this.authenticationService.logout()
    this.router.navigate(["/auth/login"], {skipLocationChange: false})
  }
  }


  export class MyComponent {
    @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

    someMethod() {
      this.trigger.openMenu();
    }
}
