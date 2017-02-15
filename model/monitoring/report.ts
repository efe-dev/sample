import { DataCategory, DataUnit, DataSection } from '../../model';
import { ReflectiveInjector } from '@angular/core';

export class Report {
    public id: string;
    public deviceType: string;
    public deviceId: number;
    public dataCategory: DataCategory;
    public dataUnit: DataUnit;
    public dataSection: DataSection;
    public dateStart: number;
    public dataGrouping: string;
    public data: Float32Array;
    public timeStamp: number;
    public etag: string

    constructor(rawData: any) {
        if (!rawData) {
            throw new Error('Raw data empty');
        }
        this.id = rawData.id;
        this.deviceType = rawData.deviceType;
        this.deviceId = rawData.deviceId;
        this.dataCategory = rawData.dataCategory;
        this.dataUnit = rawData.dataUnit;
        this.dataSection = rawData.dataSection;
        this.dateStart = rawData.dateStart;
        this.dataGrouping = rawData.dataGrouping;

        let dataString = atob(rawData.data);
        let bytes = new Uint8Array( dataString.length );
        for ( let i=0; i<dataString.length; i+=1 ) {
            bytes[i] = dataString.charCodeAt(i);
        }
        this.data = new Float32Array(bytes.buffer);

        this.timeStamp = rawData.timeStamp;
        this.etag = rawData.eTag;
    }
}