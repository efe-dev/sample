import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbFormats, LabelNames } from '../../shared';
import { DevicesRepository, ProjectsService, HousesService, UserService } from '../../service';
import { Device, Project, DataCategory, DataUnit, DataSection, DeviceInfo } from '../../model';
import { Subscription } from 'rxjs/Rx';
import { TimeInterval, chartTypes } from '../shared';

@Component({
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent {
    DataUnit = DataUnit;
    DataCategory = DataCategory;
    DataSection = DataSection;

    protected deviceId: number;
    protected deviceType: string;
    public devices: DeviceInfo[] = [];
    public device: Device;
    protected subscription: Subscription;
    public error: string;
    public chartTypes = chartTypes;
    public TimeInterval = TimeInterval;
    public time: number = TimeInterval.Month;
    public loading: boolean = true;

    constructor(protected activatedRoute: ActivatedRoute,
        protected devicesRepository: DevicesRepository,
        protected projectsService: ProjectsService,
        protected housesService: HousesService,
        protected userService: UserService,
        protected breadcrumbFormats: BreadcrumbFormats) {
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((p: any) => {
            let houseId: string = p['house_id'];
            this.deviceId = parseInt(p['device_id']);
            this.deviceType = p['device_type'];
            this.error = null;

            this.breadcrumbFormats.setDeviceDetailsTrail(houseId, this.deviceType, this.deviceId)
                .then(() => { }, (error) => {
                    this.setError(error);
                })

            this.devicesRepository.get(this.deviceType, this.deviceId).then((device: Device) => {
                this.device = device;
            });

            this.housesService.getById(houseId).then(house => {
                this.devices = this.devices.concat(house.Devices.filter(d => !this.deviceId || d.Id === this.deviceId));
            }, (houseError) => { this.setError(LabelNames.ErrorStreetaddress); });
        });
    }

    protected setError(errorLabel: string) {
        this.error = errorLabel;
    }

    public intervalChanged(newTime: number) {
        if (newTime != this.time) {
            this.time = newTime;
            this.loading = true;
        }
    }

    public onLoadComplete(event: string) {
        this.loading = false;
    }
}
