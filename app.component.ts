import { Component, ViewChild, Optional, OnInit } from '@angular/core';
import { MdMenuTrigger} from '@angular/material';
import { DragulaService} from 'ng2-dragula/ng2-dragula';
import { MdDialog, MdDialogRef} from '@angular/material';
import { DialogInputComponent } from './dialog-input/dialog-input.component';
import { TaskService} from './task.service';
import { ProjectService } from './project.service';
import { Project } from './project';
import { ResourceService  } from './resource.service';
import { Resource} from './resource';
import { Router } from '@angular/router';
import { Task } from './task';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DragulaService, TaskService]
})

export class AppComponent implements OnInit {
  userLogged: boolean = false;
  username: string = "";
  constructor(private router: Router, private authenticationService: AuthenticationService, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');
  }

  ngOnInit() {
    if (this.authenticationService.user) {
      this.userLogged = true;
      this.username = this.authenticationService.user.name;
    }
  }
  logout(){
      this.authenticationService.logout();
      this.router.navigate(["/auth/login"], {skipLocationChange: true})
    }


}
