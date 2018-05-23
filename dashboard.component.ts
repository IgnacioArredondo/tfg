import { Component, OnInit,ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService} from '../task.service';
import { Globals} from '../globals';
import { DragulaService} from 'ng2-dragula/ng2-dragula';
import { MdDialog, MdDialogRef} from '@angular/material';
import { DialogInputComponent } from '../dialog-input/dialog-input.component';
import { MdMenuTrigger} from '@angular/material';
import { Activity } from '../activity';
import { ActivityService } from '../activity.service';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { AuthenticationService } from '../authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public tasks:Task[];
  public projectTask:string[]=[];
  public c;
  public n
  public pro;
  public h:Number;
  public task: Task=new Task();
  public project: Project=new Project();
 
  public name:String;
  public username:Array<String>=new Array<String>();
 

  constructor(translate: TranslateService,private authService: AuthenticationService, private activityService: ActivityService,private globals:Globals,private projectService:ProjectService,private taskService:TaskService,private dragulaService: DragulaService, public mdDialog: MdDialog) { }

  ngOnInit() {

     this.globals.title = "Dashboard";
     if(this.authService.isDeveloper()==true)
      {
          this.getUserTasks(); 
      }
      else{
          this.getTasks();
          //this.getTodoProjects();
          this.getProjectTasks();
      }
  }



  /**
   * Obtener número de tareas pendientes y pintar tareas retrasadas en caso de ser el resto de usuarios
   */
  getTasks(): void {
      this.taskService.getTodoTaskDashboard().then((data) => {
         /*    
        this.c=data.valueOf();
        console.log(this.c);
        */
      });
      this.taskService.getOverdueTaskDashboard().then((data) => {
      this.tasks = data;

      this.tasks.sort(function(name1, name2) {
        
        if (name1.end_date < name2.end_date) {
          return -1;
        } else if (name1.end_date > name2.end_date) {
          return 1;
        } else {
          return 0;
        }
      });    
     });
  }


   /**
   * Obtener número de tareas pendientes y pintar tareas retrasadas en caso de ser usuario developer
   */
  getUserTasks(): void 
    {
      this.taskService.getTodoTaskDashboard().then((data)=>
      {
        this.c=data.valueOf();
      });

      this.taskService.getByUserDashboard().then((data) => {
      this.tasks = data;
      
      this.tasks.sort(function(name1, name2) {
        
        if (name1.end_date < name2.end_date) {
          return -1;
        } else if (name1.end_date > name2.end_date) {
          return 1;
        } else {
          return 0;
        }
      });

     });
 
  }

  /**
   * Obtener tareas pendientes de un proyecto
   */
  getProjectTasks()
  {
   
    this.taskService.getProjectTasks().then((data) => {

       this.projectTask=data;
        
   });

  }

  /**
   * Obtener número de proyectos pendientes
  
  getTodoProjects(): void 
  {
      this.projectService.getTodoProjectDashboard().then((data) => {
      this.n=data.valueOf();
      console.log(this.n);
      });
  }
  */

  now(fecha:Date):number
  {

    let v=new Date(fecha);

    let f=v.getDate();

    let b=new Date();

    let r=b.getDate();
    
    if (f < r) {
      return -1;
    } else if (f > r) {
      return 1;
    } else {
      return 0;
    }


  }

   

}
