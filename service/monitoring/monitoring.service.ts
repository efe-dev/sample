import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { HttpService } from '../utils';
import { DataFormatting, Report, DataCategory } from '../../model';

@Injectable()
export class MonitoringService {
    constructor(private httpService: HttpService, private userService: UserService) { }

    public getFullReportForDevice(deviceType: string, deviceId: number, grouping: number, start: number, take: number): Promise<Report[]> {
        var url = `devices/${deviceType}/${deviceId}/report/${grouping}`;
        return this.httpService.get(`${url}?start=${start}&take=${take}`)
            .then(resp => resp.json())
            .then(rawResponse => {
                if (!Array.isArray(rawResponse)) {
                    throw new Error("Expected response to be an array");
                }
                return rawResponse.map(r => new Report(r));
            });
    }

    public DataCategoryColor(dataCategory: DataCategory): string {
        switch (dataCategory) {
            case DataCategory.BoilerHighTemp:
                return '#A11E08';
            case DataCategory.BoilerLowTemp:
                return '#4ca8ff';
            case DataCategory.AmbientTemp:
                return '#FF9F0D';
            case DataCategory.SetpointTemp:
                return '#666';
            case DataCategory.BoilerEnergyConsumed:
                return '#4ca8ff';
            case DataCategory.EnergyConsumed:
                return '#4ca8ff';
            case DataCategory.EnergyGenerated:
                return '#05ba01';
            case DataCategory.EnergyBudget:
                return '#4ca8ff';
            case DataCategory.TimeModeOff:
                return '#eee';
            case DataCategory.TimeModeCooling:
                return '#4ca8ff';
            case DataCategory.TimeModeCentralHeating:
                return '#FF9F0D';
            case DataCategory.TimeModeHotWater:
                return '#A11E08';
            default:
                return '#000';
        }
    }

    public DataFormatting(report: Report): DataFormatting {
        switch (report.dataCategory) {
            case DataCategory.AmbientTemp:
                return {
                    zones: [20, 20, 22, 24],
                    zonesPattern: ['#eee', '#05ba01', '#FF9F0D', '#A11E08'],
                    min: 18, max: 24,
                    gaugeDataFilter: () => this.GetLastValidNumber(report.data),
                    showAsGauge: true,
                    showInDeviceWidget: true,
                    showInGraph: true,
                    index: 0,
                };
            case DataCategory.SetpointTemp:
                return {
                    zones: [20, 20, 22, 24],
                    zonesPattern: ['#eee', '#05ba01', '#FF9F0D', '#A11E08'],
                    min: 18, max: 24,
                    gaugeDataFilter: () => this.GetLastValidNumber(report.data),
                    showAsGauge: true,
                    showInDeviceWidget: true,
                    showInGraph: true,
                    index: 1,
                };
            case DataCategory.BoilerEnergyConsumed:
                return {
                    zones: [100, 100, 150, 200],
                    zonesPattern: ['#eee', '#05ba01', '#FF9F0D', '#A11E08'],
                    min: 0, max: 200,
                    gaugeDataFilter: (): number => {
                        let countValue = 0;
                        let sumValue = 0;
                        report.data.filter(v => !isNaN(v)).forEach(v => { countValue++; sumValue += v; });
                        return (sumValue) / (countValue || 1);
                    },
                    showAsGauge: true,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    index: 10,
                };
            case DataCategory.EnergyConsumed:
                return {
                    zones: [report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0)],
                    zonesPattern: ['#eee'],
                    min: 0, max: report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0),
                    gaugeDataFilter: (): number => report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0),
                    showAsGauge: report.data.some(v => !isNaN(v)),
                    showInDeviceWidget: true,
                    showInGraph: true,
                    index: 21,
                };
            case DataCategory.EnergyGenerated:
                return {
                    zones: [Math.abs(report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0))],
                    zonesPattern: ['#05ba01'],
                    min: 0, max: Math.abs(report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0)),
                    gaugeDataFilter: (): number => Math.abs(report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0)),
                    showAsGauge: report.data.some(v => !isNaN(v)),
                    showInDeviceWidget: true,
                    showInGraph: true,
                    index: 20,
                };
            case DataCategory.EnergyBudget:
                return {
                    zones: [report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0)],
                    zonesPattern: ['#eee'],
                    min: 0, max: report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0),
                    //max: 0, min: report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0),
                    gaugeDataFilter: (): number => report.data.filter(v => !isNaN(v)).reduce((p, c) => p + c, 0),
                    showAsGauge: report.data.some(v => !isNaN(v)),
                    showInDeviceWidget: false,
                    showInGraph: false,
                    index: 25,
                };
            case DataCategory.TimeModeOff:
                return {
                    showAsGauge: false,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    zonesPattern: ['#eee'],
                    index: 0,
                };
            case DataCategory.TimeModeCooling:
                return {
                    showAsGauge: false,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    zonesPattern: ['#4ca8ff'],
                    index: 0,
                };
            case DataCategory.TimeModeCentralHeating:
                return {
                    showAsGauge: false,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    zonesPattern: ['#FF9F0D'],
                    index: 0,
                };
            case DataCategory.TimeModeHotWater:
                return {
                    showAsGauge: false,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    zonesPattern: ['#A11E08'],
                    index: 0,
                };
            case DataCategory.BoilerHighTemp:
            case DataCategory.BoilerLowTemp:
                return {
                    min: 0, max: 100,
                    gaugeDataFilter: () => this.GetLastValidNumber(report.data),
                    showInDeviceWidget: false,
                    showInGraph: !this.userService.isTenant(),
                    index: 0,
                };
            default:
                return {
                    showAsGauge: false,
                    showInDeviceWidget: false,
                    showInGraph: true,
                    index: 0,
                };
        }
    }

    public GetLastValidNumber(array: Float32Array): number {
        for (var i = array.length - 1; i >= 0; --i) {
            if (!isNaN(array[i])) {
                return array[i];
            }
        }
        return null;
    }
}
