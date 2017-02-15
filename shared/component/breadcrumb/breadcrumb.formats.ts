import { Inject, Injectable } from '@angular/core';
import { RouteService } from '../../../app.routes.service';
import { Device, Project, StreetAddress, House, Address, DataUnit, DataSection, DeviceInfo } from '../../../model';
import { BreadcrumbService, LabelNames } from '../../service';
import { UserService, HousesService, ProjectsService, AddressesService, DevicesRepository } from '../../../service'

@Injectable()
export class BreadcrumbFormats {
  public constructor(
    private routeService: RouteService,
    private breadcrumbService: BreadcrumbService,
    private userService: UserService,
    private housesService: HousesService,
    private projectsService: ProjectsService,
    private addressesService: AddressesService,
    private devicesRepository: DevicesRepository) { }

  public setProjectsTrail() {
    this.breadcrumbService.setBreadCrumb({ 'Projects': this.routeService.getProjectsUrl() });
  }

  public setProjectTrail(projectId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.projectsService.getById(projectId).then((project: Project) => {
        this.breadcrumbService.setBreadCrumb({
          'Projects': this.routeService.getProjectsUrl(),
          [project.Name]: this.routeService.getProjectDetailUrl(project.Id)
        });
        resolve(true);
      }, (error) => reject(LabelNames.ErrorProject));
    });
  }

  public setHouseTrail(houseId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.housesService.getById(houseId).then(house => {
        if (this.userService.isTenant()) {
          this.userService.getStreetAddress().then((streetAddress) => {
            this.breadcrumbService.setBreadCrumb({
              [this.formatStreetAddress(streetAddress)]: this.routeService.getHouseDetailUrl(houseId)
            });
            resolve(true);
          }, (streetError) => {
            this.setDefaultBreadcrumbs();
            reject(LabelNames.ErrorStreetaddress);
          })
        }
        else {
          this.projectsService.getById(house.ProjectId).then((project: Project) => {
            this.breadcrumbService.setBreadCrumb({
              'Projects': this.routeService.getProjectsUrl(),
              [project.Name]: this.routeService.getProjectDetailUrl(project.Id),
              [this.formatHouseAddress(house.Address)]: this.routeService.getHouseDetailUrl(house.Id.toString())
            });
            resolve(true);
          }, (projError) => {
            this.setDefaultBreadcrumbs();
            reject(LabelNames.ErrorProject);
          });
        }
      }, (houseError) => {
        this.setDefaultBreadcrumbs();
        reject(LabelNames.ErrorStreetaddress);
      });
    });
  }

  public setDeviceAnalysisTrail(houseId: string, dataUnit: DataUnit, dataSection: DataSection): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.housesService.getById(houseId).then(house => {
        if (this.userService.isTenant()) {
          this.userService.getStreetAddress().then((streetAddress) => {
            this.breadcrumbService.setBreadCrumb({
              [this.formatStreetAddress(streetAddress)]: this.routeService.getHouseDetailUrl(houseId),
              ['Analysis']: this.routeService.getHouseAnalysisUrl(houseId, dataUnit, dataSection)
            });
            resolve(true);
          }, (streeterror) => {
            reject(LabelNames.ErrorProject);
          });
        }
        else {
          this.projectsService.getById(house.ProjectId).then(
            (project: Project) => {
              this.setCorpDeviceWithHouseTrail(project, house, house.Devices[0]);
              resolve(true);
            },
            (projError) => {
              reject(LabelNames.ErrorProject);
            });
        }
      }, (houseError) => { reject(LabelNames.ErrorStreetaddress); });
    });
  }

  public setDeviceDetailsTrail(houseId: string, deviceType: string, deviceId: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.housesService.getById(houseId).then(house => {
        if (this.userService.isTenant()) {
          this.userService.getStreetAddress().then((streetAddress) => {
            let device = house.Devices[0];
            this.breadcrumbService.setBreadCrumb({
              [this.formatStreetAddress(streetAddress)]: this.routeService.getHouseDetailUrl(houseId),
              [`${device.DeviceType} ${device.Id}`]: this.routeService.getDeviceDetailsUrl(houseId, device.DeviceType, device.Id)
            });
            resolve(true);
          }, (streeterror) => {
            reject(LabelNames.ErrorProject);
          });
        }
        else {
          this.projectsService.getById(house.ProjectId).then(
            (project: Project) => {
              this.setCorpDeviceWithHouseTrail(project, house, house.Devices[0]);
              resolve(true);
            },
            (projError) => {
              reject(LabelNames.ErrorProject);
            });
        }
      }, (houseError) => { reject(LabelNames.ErrorStreetaddress); });
    });
  }

  private setCorpDeviceWithHouseTrail(project: Project, house: House, device: DeviceInfo) {
    if (project) {
      this.breadcrumbService.setBreadCrumb({
        'Projects': this.routeService.getProjectsUrl(),
        [project.Name]: this.routeService.getProjectDetailUrl(house.ProjectId),
        [this.formatHouseAddress(house.Address)]: this.routeService.getHouseDetailUrl(house.Id.toString()),
        [`${device.DeviceType} ${device.Id}`]: this.routeService.getDeviceDetailsUrl(house.Id.toString(), device.DeviceType, device.Id)
      });
      return true;
    }
    return false;
  }

  private setDefaultBreadcrumbs() {
    if (this.userService.isTenant()) {
      this.breadcrumbService.setBreadCrumb({
        'Not Available': null
      });
    }
    else {
      this.breadcrumbService.setBreadCrumb({
        'Projects': this.routeService.getProjectsUrl(),
      });
    }
  }

  private formatStreetAddress(streetaddress: StreetAddress): string {
    return `${streetaddress.Street} ${streetaddress.HouseNumber} ${streetaddress.City}`;
  }

  private formatHouseAddress(address: Address): string {
    return `${address.Line1} ${address.Line2} ${address.Line3} ${address.Locality}`;
  }
}