import { Injectable } from '@angular/core';
import { Device } from '../model';
import { HttpService, HttpOptions } from './utils';

@Injectable()
export class DevicesRepository {
    public constructor(private httpService: HttpService) { }

    public get(deviceType: string, deviceId: number): Promise<Device> {
        return this.httpService.get(`devices/${deviceType}/${deviceId}`, HttpOptions.CachedRequest())
            .then(rawResponse => rawResponse.json())
            .then(rawData => {
                let device = Device.createFromRequest(rawData);
                if(!device){
                    throw new Error('No device found');
                }
                return device;
            });
    }
}