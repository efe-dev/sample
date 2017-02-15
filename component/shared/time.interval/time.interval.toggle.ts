import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TimeInterval } from './time.interval.types';
import { DataUnit } from '../../../model';

@Component({
  selector: 'time-interval',
  templateUrl: './time.interval.toggle.html',
  styleUrls: ['./time.interval.toggle.scss']
})
export class TimeIntervalToggle {
  @Output() public changed: EventEmitter<number> = new EventEmitter<number>();
  @Input() public time: number;
  @Input('dataUnit') public dataUnit: DataUnit;
  public options: { key: string, time: TimeInterval }[] = [];
  public selection: { key: string, time: TimeInterval };

  ngOnInit() {
    if (this.dataUnit === DataUnit.Celsius) {
      this.options.push({ key: "Today", time: TimeInterval.Day })
      this.options.push({ key: "Last Week", time: TimeInterval.Week })
    };
    this.options.push({ key: "Last Month", time: TimeInterval.Month })
    this.options.push({ key: "Year", time: TimeInterval.Year })
    this.selection = this.options.find(o => o.time === this.time);
  }

  public change(timeInterval: { key: string, time: TimeInterval }) {
    this.selection = timeInterval;
    this.changed.next(this.selection.time);
  }
}