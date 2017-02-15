import { Component } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(router: Router, authService: AuthService) {
    const localRedirect = authService.getLocalRedirect();
    if(localRedirect){
      router.navigate(localRedirect.split('/'));
    }
    else{
      router.navigate(['dashboard']);
    }
  }
}
