import { Component, Input } from '@angular/core';
import { RouteService } from '../../../../app.routes.service';
import { MonitoringService } from '../../../../service';
import { TranslationService } from '../../../service';
import { DataUnit, Report, DataCategory, DataFormatting } from '../../../../model';
import { Subscription } from 'rxjs';
import * as c3 from 'c3';

@Component({
    selector: 'gauge-widget',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss']
})

export class GaugeComponent {
    DataUnit = DataUnit;
    DataCategory = DataCategory;
    @Input('houseId') private houseId: number;
    @Input('report') private report: Report;
    private languageChangeSubscription: Subscription;

    isDisabled: boolean;
    dataFormatting: DataFormatting;

    constructor(private routeService: RouteService, private translationService: TranslationService, private monitoringService: MonitoringService) {
        this.isDisabled = false;
        this.languageChangeSubscription = translationService.LanguageChanged.subscribe((l: string) => this.ngAfterViewInit());
    }

    ngOnDestroy() {
        if (this.languageChangeSubscription) {
            this.languageChangeSubscription.unsubscribe();
            this.languageChangeSubscription = null;
        }
    }

    ngOnInit() {
        this.dataFormatting = this.monitoringService.DataFormatting(this.report);
        this.isDisabled = this.dataFormatting.gaugeDataFilter(this.report.data) === null;
    }

    ngAfterViewInit() {
        const chart = c3.generate({
            bindto: `#${'gauge-' + this.report.id}-label`,
            data: {
                columns: this.dataFormatting.zones.reverse().map((zone) => new Array<any>('zone' + zone, zone)),
                type: 'gauge',
            },
            interaction: {
                enabled: false
            },
            gauge: {
                min: this.dataFormatting.min,
                max: this.dataFormatting.max,
                width: 5,
                label: {
                    show: false,
                    format: (v: number, r: number) => ''
                },
                expand: false
            },
            tooltip: {
                show: false
            },
            color: {
                pattern: this.dataFormatting.zonesPattern.reverse(),
            },
            size: {
                width: 280
            }
        });

        try {
            c3.generate({
                bindto: `#${'gauge-' + this.report.id}`,
                data: {
                    columns: [
                        [`${this.report.deviceType}`, this.dataFormatting.gaugeDataFilter(this.report.data) || 0]
                    ],
                    type: 'gauge',
                    groups: [
                        ['data1']
                    ]
                },
                gauge: {
                    min: this.dataFormatting.min,
                    max: this.dataFormatting.max,
                    label: {
                        format: (v: number, r: number) => v.toFixed(1).toString().replace('.', ','),
                        show: false
                    },
                    width: 25,
                    units: this.translationService.instant(DataUnit[this.report.dataUnit]),
                },
                color: {
                    pattern: ['#00529C']
                },
                size: {
                    width: 280
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    selectGauge() {
        switch (this.report.dataCategory) {
            case DataCategory.EnergyConsumed:
            case DataCategory.EnergyGenerated:
                this.routeService.navigateToDataSectionAnalysis(this.houseId, this.report.dataUnit, this.report.dataSection);
                break;
            default:
                this.routeService.navigateToDeviceAnalysis(this.houseId, this.report.deviceType, this.report.deviceId, this.report.dataUnit, this.report.dataSection);
        }
    }
}