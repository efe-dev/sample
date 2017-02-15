import { Injectable } from '@angular/core';
import { Project } from '../../model';
import { HttpService, HttpOptions } from '../utils';
import { Response } from '@angular/http';

@Injectable()
export class ProjectsService {
    constructor(private httpService: HttpService) { }

    getAll(): Promise<Project[]> {
        return this.httpService.get('projects', HttpOptions.CachedRequest())
            .then(res => res.json())
            .then(rawObj => {
                if (!Array.isArray(rawObj)) {
                    throw new Error("Expect response to be an array of projects");
                }

                const projects: Project[] = [];
                for (let i = 0; i < rawObj.length; i++) {
                    const rawEntry = rawObj[i];
                    if (rawEntry === null || rawEntry === undefined) {
                        throw new Error("Expect entry to be a project");
                    }
                    if (!Number.isInteger(rawEntry.id) ||
                        !rawEntry.city ||
                        !rawEntry.name ||
                        !Number.isInteger(rawEntry.houseCount)) {
                        throw new Error("Expect entry to be a project");
                    }
                    const project = new Project(<number>rawEntry.id,
                        <string>rawEntry.city,
                        <string>rawEntry.name,
                        <number>rawEntry.houseCount);
                    projects.push(project);
                }

                return projects;
            });
    }

    getById(id: number): Promise<Project> {
        return this.getAll().then((projects) => {
            let project: Project = null;
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].Id === id) {
                    project = projects[i];
                }
            }
            if (!project) {
                throw new Error('No project found');
            }
            return project;
        });
    }
}
