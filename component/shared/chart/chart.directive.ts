import { Directive, Input, Output, ElementRef, OnChanges, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonitoringService } from '../../../service';
import { TranslationService, LabelNames } from '../../../shared';
import { Report, DataCategory, DataUnit, DataSection, DeviceInfo } from '../../../model';
import { chartTypes } from './chart.types';
import { TimeInterval } from '../time.interval/time.interval.types';
import * as c3 from 'c3';
import * as d3 from 'd3';
import * as moment from 'moment';
import * as _ from 'lodash';

@Directive({
    selector: '[Chart]'
})
export class ChartDirective implements OnChanges {
    DataUnit: DataUnit;


    @Input('devices') public devices: DeviceInfo[];
    @Input('timePeriod') public timePeriod: TimeInterval;
    @Input('dataUnit') public dataUnit: DataUnit;
    @Input('dataSection') public dataSection: DataSection;
    @Input('start') public start: number = 0;
    @Output() public error: EventEmitter<string> = new EventEmitter<string>();
    @Output() public loadComplete: EventEmitter<string> = new EventEmitter<string>();
    private languageChangedSubscription: Subscription;
    private element: any;
    private message: string;
    private chartType: string;
    private grouping: TimeInterval;

    constructor(public elementRef: ElementRef, private monitoringService: MonitoringService, private translationService: TranslationService) {
        this.element = this.elementRef.nativeElement;
        this.translationService.LanguageChanged.subscribe((newLanguage: string) => {
            moment.locale(newLanguage);
        });
    }

    ngOnChanges(changes: any) {
        if (changes && changes.timePeriod) {
            switch (this.timePeriod) {
                case TimeInterval.Month:
                    this.grouping = TimeInterval.Day;
                    this.start = moment().utc().subtract(this.grouping * Math.round(this.timePeriod / this.grouping), 'minutes').startOf('day').valueOf()
                    break;
                case TimeInterval.Year:
                    this.grouping = TimeInterval.Week;
                    this.start = moment().utc().subtract(this.grouping * Math.round(this.timePeriod / this.grouping), 'minutes').startOf('week').valueOf()
                    break;
                default:
                    this.grouping = TimeInterval.BiHour;
                    this.start = moment().utc().subtract(this.grouping * Math.round(this.timePeriod / this.grouping), 'minutes').startOf('hour').subtract(moment(this.start).hours() % 2, 'hours').valueOf()
            }
        }
        if (changes && (changes.devices || changes.timePeriod) && this.devices && this.devices.length > 0) {
            Promise.all(this.devices.map(d => this.monitoringService.getFullReportForDevice(d.DeviceType, d.Id, this.grouping, this.start, Math.round(this.timePeriod / this.grouping))))
                .then((reports) => {
                    this.loadComplete.next();
                    this.drawChart([].concat.apply([], reports));
                });
        }
    }

    ngOnInit() {
        switch (this.dataUnit) {
            case DataUnit.Wh:
            case DataUnit.kWh:
            case DataUnit.Liter:
            case DataUnit.m3:
                this.chartType = chartTypes.bar;
                break;
            case DataUnit.Percent:
            case DataUnit.Counter:
                this.chartType = chartTypes.stacked;
                break;
            default:
                this.chartType = chartTypes.spline;
        }
    }

    ngOnDestroy() {
        if (this.languageChangedSubscription) {
            this.languageChangedSubscription.unsubscribe();
            this.languageChangedSubscription = null;
        }
    }

    private drawChart(reports: Report[]) {
        let chartReports = reports
            .filter(r => r.dataUnit === this.dataUnit && r.dataSection === this.dataSection && this.monitoringService.DataFormatting(r).showInGraph)
            .sort(r => r.dataCategory);

        let chartOptions: c3.ChartConfiguration = {
            bindto: `#${this.element.id}`,
            size: {
                height: 450
            },
            padding: {
                bottom: 30
            },
            data: {
                columns: chartReports
                    .map(r => {
                        let dataArray: any[] = Array.from(r.data);
                        dataArray.unshift(this.translationService.instant(DataCategory[r.dataCategory]));
                        return dataArray;
                    }),
                type: this.chartType,
                empty: {
                    label: {
                        text: this.translationService.instant(this.message)
                    }
                }
            },
            bar: {
            },
            zoom: {
                enabled: true
            },
            transition: 300,
            axis: {
                x: {
                    type: 'indexed',
                    label: this.translationService.instant(TimeInterval[this.grouping]),
                    tick: {
                        fit: true,
                        rotate: 45,
                        multiline: false,
                        culling: false,
                        format: this.DataLabelFormat
                    }
                },
                y: {
                    label: this.translationService.instant(DataUnit[this.dataUnit]),
                    tick: {
                        format: (x) => x.toFixed(1)
                    }
                },
            },
            grid: {
                x: {
                    show: false
                }
            },
            subchart: {
                show: true,
                size: {
                    height: 50
                }
            },
            color: {
                pattern: chartReports.map(r => this.monitoringService.DataCategoryColor(r.dataCategory)) //['#8bb1e8', '#85b200']
            }
        };

        if (this.chartType === chartTypes.stacked) {
            chartOptions.data.groups = [chartOptions.data.columns.map(c => <string>c[0])];
            chartOptions.axis.y.padding = { top: 0, bottom: 0 }
        }

        let chart = c3.generate(chartOptions);
    }

    private DataLabelFormat = (index: number): string => {
        let date = new Date(this.start + (index * this.grouping * 60000))
        switch (this.grouping) {
            case TimeInterval.BiHour:
                return this.timePeriod === TimeInterval.Week ? (date.getHours() <= 1 ? moment(date).format('DD-MM') : '') : moment(date).format('HH:mm');
            case TimeInterval.Day:
                return moment(date).format('DD-MM');
            case TimeInterval.Week:
                return moment(date).isoWeek().toString();
            default:
                this.error.next(`Grouping ${this.grouping} not supported`);
        }
    }
}