import { Component, OnInit, Input } from '@angular/core';

import { DeviceInfo, Report, DataFormatting, DataCategory } from '../../model';
import { MonitoringService } from '../../service';

@Component({
  selector: 'app-device-widget',
  templateUrl: './device.widget.component.html',
  styleUrls: ['./device.widget.component.scss']
})
export class DeviceWidgetComponent implements OnInit {
  DataCategory = DataCategory;
  @Input() public device: DeviceInfo;
  reports: Report[];
  monitoringService: MonitoringService

  constructor(monitoringService: MonitoringService) {
    this.monitoringService = monitoringService;
  }

  ngOnInit() {
    this.monitoringService
      .getFullReportForDevice(this.device.DeviceType, this.device.Id, 120, 0, 360)
      .then(reports => this.reports = reports.filter(r => this.monitoringService.DataFormatting(r).showInDeviceWidget));
  }

  public getIcon(report: Report): string{
    var icon = 'assets/icon/' + DataCategory[report.dataCategory] + '.svg';
    return icon;
  }
}
