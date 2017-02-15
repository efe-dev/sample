import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthService} from '../service/auth';
import { environment } from '../../environments/environment';
import {RouteService} from '../app.routes.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private routeService: RouteService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var authorized = this.authService.isAuthorized();
        var currentUrl = state.url;
        if(!authorized){
            const localRedirectUrl = currentUrl
            this.authService.forceAuth(localRedirectUrl);
        }
        else{
            const userClaims = this.authService.getClaims();
            if(userClaims.address){
                if(this.routeService.isProjectsUrl(currentUrl)){
                    this.routeService.navigateToHouseDetail(userClaims.address);
                }
            }
        }
        return authorized;
    }
}