import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { House, DeviceInfo, DeviceStatus, Project } from '../../model';
import { HousesService, ProjectsService } from '../../service';
import { RouteService } from '../../app.routes.service';
import { BreadcrumbFormats, PaginationService } from '../../shared';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {

    public projectId: number;
    public houses: House[];
    public currentPage: number;
    public totalItems: number;
    public pageSize: number = 10;
    paginatedItems: House[];

    constructor(private housesService: HousesService,
        private activateRoute: ActivatedRoute,
        private routeService: RouteService,
        private breadcrumbFormats: BreadcrumbFormats,
        private paginationService: PaginationService,
        private projectsService: ProjectsService) {

    }

    ngOnInit() {
        this.projectId = parseInt(this.activateRoute.snapshot.params['id']);

        this.breadcrumbFormats.setProjectTrail(this.projectId)
            .then(() => { }, (error) => { });

        this.housesService.getByProject(this.projectId)
            .then(houses => {
                this.houses = houses;
                this.totalItems = houses.length;
                this.currentPage = 1;
                this.setPage(1);
            });
    }

    setPage(p: number) {
        if (p < 1 || p > this.totalItems) {
            return;
        }
        this.currentPage = p;
    }

    public selectHouse(projectId: any, house: House): void {
        this.routeService.navigateToHouseDetail(house.Id.toString());
    }
}
