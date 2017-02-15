import { DeviceModel } from './device.model';

export class Device {
    public get Id(): number { return this.id; }
    public get DeviceType(): string { return this.deviceType; }
    public get Active(): boolean { return this.active; }
    public get Model(): DeviceModel { return this.deviceModel; }
    public get LastCommunication(): Date { return this.lastCommunication; }

    private id: number;
    private deviceTypeId: number;
    private deviceType: string;
    private active: boolean;
    private deviceModel: DeviceModel;
    private lastCommunication: Date;
    private status: string;

    private constructor() {

    }

    public isWpu(): boolean {
        return this.DeviceType === 'wpu';
    }

    public isBwp(): boolean {
        return this.DeviceType === 'bwp';
    }

    public isPulse(): boolean{
        return this.DeviceType.startsWith('pulse');
    }

    public static createFromRequest(rawData: any) {
        if (!rawData) {
            throw new Error('Expect raw data to exist');
        }
        if (!rawData.id || !rawData.deviceTypeId || !rawData.deviceType) {
            throw new Error('Expect raw data to contain id and device type');
        }
        let device = new Device();
        device.id = rawData.id;
        device.deviceTypeId = rawData.deviceTypeId;
        device.deviceType = rawData.deviceType;
        device.active = rawData.active;
        device.deviceModel = DeviceModel.createFromRawResponse(rawData.model);
        device.lastCommunication = new Date();
        return device;
    }
}