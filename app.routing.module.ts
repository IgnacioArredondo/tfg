import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes }   from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectNewComponent } from './project-new/project-new.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectService} from './project.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientNewComponent } from './client-new/client-new.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientDeleteComponent } from './client-delete/client-delete.component';
import { ClientComponent } from './client/client.component';
import { ClientService} from './client.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { TaskNewComponent } from './task-new/task-new.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './task.service';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdSidenavModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdCardModule,MdButtonModule,MdIconModule,MdIconRegistry} from '@angular/material';
import { MdToolbarModule} from '@angular/material';
import { MdMenuModule} from '@angular/material';
import { MaterialModule } from '@angular/material';
import { MdProgressBarModule} from '@angular/material';
import { MdDialogModule} from '@angular/material';
import { DialogInputComponent } from './dialog-input/dialog-input.component';
import { MdChipsModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ResourceService } from './resource.service';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { GuardadoComponent } from './guardado/guardado.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmFailedComponent } from './confirm-failed/confirm-failed.component';
import { ConfirmSuccessComponent } from './confirm-success/confirm-success.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard} from './admin.guard';
import { HistoricoComponent } from './historico/historico.component';
import { ActivityComponent } from './activity/activity.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

 const ROUTES: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/confirm', component: ConfirmComponent },
  { path: 'auth/register', component: UserPasswordComponent },
  { path: 'auth/restore-password', component:ConfirmComponent},
  { path: 'success', component: ConfirmSuccessComponent },
  { path: 'failed', component: ConfirmFailedComponent },
  { path: 'home', component:HomeComponent,
  children:[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'  },
  { path: 'users', component: UserComponent,canActivate: [AdminGuard] },
  { path: 'user-create', component: UserCreateComponent,canActivate: [AdminGuard] },
  { path: 'user-detail/:id', component: UserDetailComponent,canActivate: [AdminGuard] },
  { path: 'user-edit/:id', component: UserEditComponent,canActivate: [AdminGuard] },
  { path: 'user-delete/:id', component: UserDeleteComponent,canActivate: [AdminGuard] },
  { path: 'projects', component: ProjectsComponent,canActivate: [AdminGuard] },
  { path: 'project-new', component: ProjectNewComponent,canActivate: [AdminGuard]  },
  { path: 'project-edit/:id', component: ProjectEditComponent,canActivate: [AdminGuard]  },
  { path: 'project-detail/:id', component: ProjectDetailComponent,canActivate: [AdminGuard] },
  { path: 'project-delete/:id', component: ProjectDeleteComponent,canActivate: [AdminGuard] },
  { path: 'client', component: ClientComponent,canActivate: [AdminGuard]  },
  { path: 'client-new', component: ClientNewComponent,canActivate: [AdminGuard]  },
  { path: 'client-edit/:id', component: ClientEditComponent,canActivate: [AdminGuard] },
  { path: 'client-detail/:id', component: ClientDetailComponent,canActivate: [AdminGuard]  },
  { path: 'client-delete/:id', component: ClientDeleteComponent,canActivate: [AdminGuard] },
  { path: 'tasks', component: TasksComponent,canActivate: [AuthGuard]  },
  { path: 'task-new', component: TaskNewComponent,canActivate: [AuthGuard]  },
  { path: 'task-edit/:id', component: TaskEditComponent,canActivate: [AdminGuard]  },
  { path: 'task-detail/:id', component:TaskDetailComponent,canActivate: [AdminGuard] },
  { path: 'task-delete/:id', component: TaskDeleteComponent,canActivate: [AdminGuard] },
  { path: 'my-tasks', component: MyTasksComponent,canActivate: [AuthGuard] },
  { path: 'project-task', component: ProjectTaskComponent,canActivate: [AuthGuard] },
  { path: 'historico/:id', component: HistoricoComponent,canActivate: [AdminGuard] },
  { path: 'activity/:id', component: ActivityComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]}
]
}
];
@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
