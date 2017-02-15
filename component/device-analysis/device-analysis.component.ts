import { basename } from 'path';
import { DeviceDetailComponent } from '../device-detail/device-detail.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TimeInterval } from '../shared';
import { ProjectsService, HousesService, UserService, DevicesRepository } from '../../service';
import { Subject, Subscription } from 'rxjs/Rx';
import { TranslationService, LabelNames, BreadcrumbFormats } from '../../shared';
import { Device, Project, StreetAddress, House, DataUnit, DataSection, DataCategory, DeviceInfo } from '../../model';

@Component({
    templateUrl: './device-analysis.component.html',
    styleUrls: ['./device-analysis.component.scss']
})
export class DeviceAnalysisComponent extends DeviceDetailComponent {
    DataUnit = DataUnit;
    DataCategory = DataCategory;
    TimeInterval = TimeInterval;

    public dataUnit: DataUnit;
    public dataSection: DataSection;
    public time: TimeInterval = TimeInterval.Month;
    public transform: boolean;
    public error: string;
    public loading: boolean;

    constructor(protected activatedRoute: ActivatedRoute,
        protected projectsService: ProjectsService,
        protected housesService: HousesService,
        protected userService: UserService,
        protected devicesRepository: DevicesRepository,
        protected translationService: TranslationService,
        protected breadcrumbFormats: BreadcrumbFormats) {
        super(activatedRoute, devicesRepository, projectsService, housesService, userService, breadcrumbFormats);
    }

    ngOnInit() {
        this.transform = false;
        this.loading = true;
        this.subscription = this.activatedRoute.params.subscribe((routeParameters: Params) => {
            let houseId: string = routeParameters['house_id'];
            this.deviceId = parseInt(routeParameters['device_id']);
            this.deviceType = routeParameters['device_type'];
            this.dataUnit = parseInt(routeParameters['data_unit']);
            this.dataSection = parseInt(routeParameters['data_section']);
            this.error = null;

            this.breadcrumbFormats.setDeviceAnalysisTrail(houseId, this.dataUnit, this.dataSection)
                .then(() => { }, (error) => {
                    this.setError(error);
                });

            this.housesService.getById(houseId).then(house => {
                this.devices = this.devices.concat(house.Devices.filter(d => !this.deviceId || d.Id === this.deviceId));
            }, (houseError) => { this.setError(LabelNames.ErrorStreetaddress); });
        });
    }

    public onError(error: string) {
        this.setError(error);
    }

    public onLoadComplete(data: string) {
        this.loading = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public intervalChanged(newTime: TimeInterval) {
        if (newTime != this.time) {
            this.time = newTime;
            this.loading = true;
        }
    }
} 
