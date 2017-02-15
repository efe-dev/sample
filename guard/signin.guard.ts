import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../service/auth';
import { CanActivate } from '@angular/router';

@Injectable()
export class SigninGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const location = window.location.hash;
    this.authService.parseFromFragment(location);
    
    return true;
  }
}
