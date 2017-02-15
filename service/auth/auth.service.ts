import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { UserClaims } from './user.claims';
import { RouteService } from '../../app.routes.service';

@Injectable()
export class AuthService {

    private token: string;
    private expires: number;
    private localRedirect: string;
    private userClaims: UserClaims;

    constructor(private routeService: RouteService) {
        this.token = sessionStorage.getItem('access_token');
        const expiresParsed = parseInt(sessionStorage.getItem('expires'));
        if (isNaN(expiresParsed)) {
            this.expires = 0;
        }
        else {
            this.expires = expiresParsed;
        }
        this.userClaims = new UserClaims(this.token);
    }

    public parseFromFragment(queryString: string) {
        const token = this.getParameterByName(queryString, 'access_token');
        const expires = this.getParameterByName(queryString, 'expires_in');
        let stateParam = this.getParameterByName(queryString, 'state');
        this.localRedirect = atob(stateParam);

        this.token = token;
        const expiresParsed = parseInt(expires);
        if (isNaN(expiresParsed)) {
            this.expires = 0;
        }
        else {
            this.expires = Date.now() + expiresParsed * 1000;
        }
        this.userClaims = new UserClaims(this.token);

        sessionStorage.setItem('access_token', this.token);
        sessionStorage.setItem('expires', this.expires.toString());
    }

    private getParameterByName(url: string, name: string): string {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    public isAuthorized(): boolean {
        const currentTime = Date.now();
        return this.token !== null && this.token !== undefined && this.token !== 'undefined' && currentTime < this.expires;
    }

    public cleanAuthState(): void {
        sessionStorage.clear();
        sessionStorage.removeItem('nonce');
    }

    public forceAuth(returnLocalRoute: string) {
        const authConfig = environment.authConfig;
        var authUrl = `${authConfig.end_point}/connect/authorize?client_id=${authConfig.client_id}&response_type=token&grant_type=authorization_code&redirect_uri=${authConfig.redirect_uri}&scope=openid device_list address&state=${btoa(returnLocalRoute)}&nonce=123456789`;
        window.location.href = authUrl;
    }

    public getCurrentUser() {
        return "fake@email.com";
    }

    public getClaims(): UserClaims {
        return this.userClaims;
    }

    public getLocalRedirect(): string {
        if(this.localRedirect){
            return this.localRedirect;
        }
        if (this.userClaims && this.userClaims.address) {
            return this.routeService.getSearchUrl(this.userClaims.address);
        }
        return "";
    }

    public getToken(): string {
        return this.token;
    }

    public logout(){
        sessionStorage.setItem('access_token', "");
        sessionStorage.setItem('expires', "0");

        const authConfig = environment.authConfig;
        window.location.href = `${authConfig.end_point}/account/logoff`;
    }
}