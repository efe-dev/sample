import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteService } from '../../app.routes.service';
import { MonitoringService, HousesService } from '../../service';
import { BreadcrumbService, GaugeComponent, BreadcrumbFormats, LabelNames } from '../../shared';
import { DeviceInfo, Report, House, Project, DataUnit, DataCategory } from '../../model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-house-detail',
    templateUrl: './house-detail.component.html',
    styleUrls: ['./house-detail.component.scss']
})
export class HouseDetailComponent implements OnDestroy {
    DataUnit = DataUnit;
    DataCategory = DataCategory;

    public houseId: string;
    public house: House;
    public reports: Report[] = [];
    private routeSubscription: Subscription;
    public toggled: boolean;
    public opened: boolean;
    public pushed: boolean;
    public error: string;

    constructor(private activatedRoute: ActivatedRoute,
        private breadcrumbService: BreadcrumbService,
        private houseService: HousesService,
        private monitoringService: MonitoringService,
        private routeService: RouteService,
        private breadcrumbFormats: BreadcrumbFormats) {
        this.toggled = false;
        this.opened = false;
        this.pushed = false;
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
            this.routeSubscription = null;
        }
    }

    ngOnInit() {
        this.routeSubscription = this.activatedRoute.params
            .subscribe(params => {
                this.reports = [];
                this.house = null;
                this.error = null;
                this.houseId = params['house_id'];

                this.breadcrumbFormats.setHouseTrail(this.houseId)
                    .then((status) => { }, (error) => {
                        this.error = error;
                    });

                this.houseService.getById(this.houseId).then(house => {
                    this.house = house;
                    Promise.all(house.Devices.map(d => this.monitoringService.getFullReportForDevice(d.DeviceType, d.Id, 120, 0, 360)))
                        .then((reports) => {
                            this.reports = [].concat.apply([], reports);
                            if (
                                this.reports.some(r => r.dataCategory === DataCategory.EnergyConsumed) &&
                                this.reports.some(r => r.dataCategory === DataCategory.EnergyGenerated) &&
                                !this.reports.some(r => r.dataCategory === DataCategory.EnergyBudget)
                            ) {
                                let generated = this.reports.find(r => r.dataCategory === DataCategory.EnergyGenerated);
                                let consumed = this.reports.find(r => r.dataCategory === DataCategory.EnergyConsumed);
                                const budget = <Report>Object.assign({}, generated);
                                budget.dataCategory = DataCategory.EnergyBudget;
                                budget.data = generated.data.map((v, i) => v = (isNaN(v) ? 0 : -v) + (isNaN(consumed.data[i]) ? 0 : -consumed.data[i]));
                                budget.id = generated.id + consumed.id;
                                this.reports.push(budget);
                            }
                            this.reports = this.reports.sort((a: Report, b: Report) => this.monitoringService.DataFormatting(a).index - this.monitoringService.DataFormatting(b).index);
                        });
                }, (houseError) => {
                    this.error = LabelNames.ErrorStreetaddress;
                });
            });
    }

    selectDevice(device: DeviceInfo) {
        this.routeService.navigateToDeviceDetails(this.houseId, device.DeviceType, device.Id);
    }
}
