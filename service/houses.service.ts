import { Injectable } from '@angular/core';
import { House, DeviceInfo, Address, DeviceModel } from '../model';
import { HttpService, HttpOptions } from './utils';

@Injectable()
export class HousesService {

  constructor(private httpService: HttpService) { }

  getByProject(projectId: number): Promise<House[]> {
    return this.httpService.get(`projects/${projectId}/houses`, HttpOptions.CachedRequest())
      .then(res => res.json())
      .then(rawObj => {
        if (!Array.isArray(rawObj)) {
          throw new Error("Expect response to be an array of houses");
        }

        const houses: House[] = [];
        for (let i = 0; i < rawObj.length; i++) {
          const rawEntry = rawObj[i];
          const house = this.parseHouse(rawEntry);
          houses.push(house);
        }

        return houses;
      });
  }

  getById(houseId: string): Promise<House> {
    return this.httpService.get(`houses/${houseId}`, HttpOptions.CachedRequest())
      .then(res => res.json())
      .then(rawObj => {
        const house = this.parseHouse(rawObj);
        if(!house){
          throw new Error('No house found');
        }
        return house;
      });
  }

  private parseHouse(rawEntry: any): House {
    if (rawEntry === null || rawEntry === undefined) {
      throw new Error("Expect entry to be a house");
    }
    if (!Number.isInteger(rawEntry.id) || !Array.isArray(rawEntry.devices) || !Number.isInteger(rawEntry.projectId)) {
      throw new Error("Expect entry to be a house");
    }
    const devices: DeviceInfo[] = [];
    for (let j = 0; j < rawEntry.devices.length; j++) {
      const rawDeviceInfo = rawEntry.devices[j];
      if (rawDeviceInfo.deviceType === '') {
        continue;
      }
      if (!Number.isInteger(rawDeviceInfo.id) || !Number.isInteger(rawDeviceInfo.deviceTypeId) || rawDeviceInfo.active === undefined) {
        throw new Error("Expect entry to be a device info");
      }
      const deviceModel: DeviceModel = DeviceModel.createFromRawResponse(rawDeviceInfo.model);
      const device: DeviceInfo = new DeviceInfo(<number>rawDeviceInfo.id, <number>rawDeviceInfo.deviceTypeId, <string>rawDeviceInfo.deviceType, <boolean>rawDeviceInfo.active, deviceModel);
      devices.push(device);
    }
    const project = new House(<number>rawEntry.id, <string>rawEntry.name, Address.createFromRequest(rawEntry.address), <string>rawEntry.buildingNumber, <string>rawEntry.blockNumber, devices, rawEntry.projectId);
    return project;
  }
}
