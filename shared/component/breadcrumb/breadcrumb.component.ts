import { Component } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized, NavigationCancel } from '@angular/router';
import { BreadcrumbService, BreadCrumbModel } from '../../service';

@Component({
    selector: 'breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    public trail: BreadCrumbModel;

    public constructor(private router: Router, breadcrumbService: BreadcrumbService) {
        breadcrumbService.changeBreadcrumb.subscribe((newValue: BreadCrumbModel) => {
            this.trail = newValue;
        });
        var previousTrail: BreadCrumbModel = null;
        var previousUrl: string = null;
        this.router.events.subscribe((n: any) => {
            if (n instanceof RoutesRecognized) {
                if (n.urlAfterRedirects !== previousUrl) {
                    previousTrail = this.trail;
                    previousUrl = n.urlAfterRedirects;
                    this.trail = null;
                }
            }
            if (n instanceof NavigationCancel) {
                this.trail = previousTrail;
            }
        });
    }
    public navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    }
}
