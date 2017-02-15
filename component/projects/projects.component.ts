import { Component } from '@angular/core';
import { ProjectsService } from '../../service/project';
import { Project } from '../../model';
import { BreadcrumbFormats } from '../../shared';
import { RouteService } from '../../app.routes.service';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects: Project[];

  constructor(private projectsService: ProjectsService,
    private routeService: RouteService,
    private breadcrumbFormats: BreadcrumbFormats) {

  }

  ngOnInit() {
    this.projectsService.getAll().then(x => {
      this.projects = x;
    });
    this.breadcrumbFormats.setProjectsTrail();
  }

  public selectProject(project: Project): void {
    this.routeService.navigateToProjectDetail(project.Id);
  }
}
