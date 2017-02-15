import { Injectable } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { DataUnit, DataSection } from './model';

@Injectable()
export class RouteService { 
    constructor(private router: Router) {}

    public navigateToProjectDetail(projectId: number): void {
        this.router.navigate(['projects', projectId]);
    }

    public navigateToHouseDetail(houseId: string): void {
        this.router.navigate(['houses', houseId]);
    }

    public navigateToDeviceAnalysis(houseId: number, device_type: string, deviceId: number, dataUnit: DataUnit, dataSection: DataSection): void {
        this.router.navigate(['houses', houseId, 'analysis', device_type, deviceId, dataUnit, dataSection]);
    }

    public navigateToDataSectionAnalysis(houseId: number, dataUnit: DataUnit, dataSection: DataSection): void {
        this.router.navigate(['houses', houseId, 'analysis', dataUnit, dataSection]);
    }

    public navigateToDeviceDetails(houseId: string, device_type: string, deviceId: number): void {
        this.router.navigate(['houses', houseId, 'details', device_type, deviceId]);
    }

    public navigateToSearch(term: string): void {
        this.router.navigate(['search', term]);
    }

    public getProjectsUrl(): string {
        return '/projects';
    }

    public getProjectDetailUrl(projectId: number): string {
        return `/projects/${projectId}`;
    }

    public getHouseDetailUrl(houseId: string): string {
        return `/houses/${houseId}`;
    }

    public getDeviceDetailsUrl(houseId: string, device_type: string, deviceId: number): string{
        return `/houses/${houseId}/details/${device_type}/${deviceId}`;
    }

    public getDeviceAnalysisUrl(houseId: string, device_type: string, deviceId: number, data_unit: DataUnit, data_section: DataSection): string{
        return `/houses/${houseId}/analysis/${device_type}/${deviceId}/${data_unit}/${data_section}`;
    }

    public getHouseAnalysisUrl(houseId: string, data_unit: DataUnit, data_section: DataSection): string{
        return `/houses/${houseId}/analysis/${data_unit}/${data_section}`;
    }

    public getSearchUrl(searchTerm: string): string {
        return `search/${searchTerm}`;
    }

    public isProjectsUrl(url: string): boolean {
        return url && url.startsWith('/projects');
    }
}