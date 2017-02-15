import { DeviceInfo } from './device.info';
import { Address } from './address';

export class House {
  public get Id(): number { return this.id; }
  public get Name(): string { return this.name; }
  public get Address(): Address { return this.address };
  public get BuildingNumber(): string { return this.buildingNumber; }
  public get BlockNumber(): string { return this.blockNumber; }
  public get Devices(): DeviceInfo[] { return this.devices; }
  public get ProjectId(): number { return this.projectId; }

  constructor(private id: number,
    private name: string,
    private address: Address,
    private buildingNumber: string,
    private blockNumber: string,
    private devices: DeviceInfo[],
    private projectId: number) {

  }

}