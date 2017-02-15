import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent, BreadcrumbComponent } from './shared';
import { BreadcrumbService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {


  constructor(private router: Router, private breadcrumbService: BreadcrumbService) { 
    
  }

}
