import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, Routes }   from '@angular/router';
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
import { Globals } from './globals';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { ProjectTaskComponent } from './project-task/project-task.component';
import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdSidenavModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdCardModule, MdButtonModule, MdIconModule, MdIconRegistry} from '@angular/material';
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
import { ActivityService } from './activity.service';
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
import { AdminGuard } from './admin.guard';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppRoutingModule }  from './app.routing.module';
import { HistoricoComponent } from './historico/historico.component';
import { ActivityComponent } from './activity/activity.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { DashboardComponent } from './dashboard/dashboard.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'projectAuth',
    tokenGetter: (() => sessionStorage.getItem('projectAuth')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectNewComponent,
    ProjectEditComponent,
    ProjectDeleteComponent,
    ClientNewComponent,
    ClientEditComponent,
    ClientDeleteComponent,
    ClientComponent,
    ProjectDetailComponent,
    ClientDetailComponent,
    TaskNewComponent,
    TasksComponent,
    MyTasksComponent,
    ProjectTaskComponent,
    DialogInputComponent,
    HomeComponent,
    TaskEditComponent,
    TaskDetailComponent,
    TaskDeleteComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
    UserDeleteComponent,
    GuardadoComponent,
    RegisterSuccessComponent,
    ConfirmComponent,
    ConfirmFailedComponent,
    ConfirmSuccessComponent,
    HistoricoComponent,
    ActivityComponent,
    UserPasswordComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    DragulaModule,
    FlexLayoutModule,
    MdSidenavModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdProgressBarModule,
    MdDialogModule,
    MdChipsModule,
    PasswordStrengthBarModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
  ],
  providers: [ProjectService, ClientService, Globals, TaskService, UserService, AuthenticationService, DragulaService, MdIconRegistry, ResourceService,ActivityService,
     { provide: LocationStrategy, useClass: HashLocationStrategy }, [AuthGuard],[AdminGuard],
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogInputComponent],
})
export class AppModule { }
