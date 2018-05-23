import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    loading: boolean = false;
    public error: string;
    
    constructor(translate: TranslateService,public formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
      let username = new FormControl('', Validators.required);
      let password = new FormControl('', Validators.required);
      let remember = new FormControl('');

      this.loginForm = formBuilder.group({
        'username': username,
        'password': password,
        'remember': remember
      });
    }

    ngOnInit() {
    }

    login() {
      this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.remember).then((result) => {

        console.log('Autenticado correctamente');
          this.router.navigate(['/home']);
      }, (error) => {
        if (401 === error.status){
          // login failed
          console.log(this.loginForm.value.username, this.loginForm.value.password);
          this.error = 'El usuario y/o la contraseña no son correctos';
        }
          console.log(this.loginForm.value.username, this.loginForm.value.password);
       
        console.log(error);
      });
    }

  }
