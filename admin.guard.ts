import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {
    
    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate() {
        if (this.authenticationService.isAdmin()) {
            
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}