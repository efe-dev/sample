import { DeviceModel } from '../device/device.model';

export class DeviceInfo {
    public get Id(): number { return this.id; }
    public get DeviceType(): string { return this.deviceType; }
    public get Active(): boolean { return this.active; }
    public get Model(): DeviceModel { return this.deviceModel; }

    constructor(private id: number, private deviceTypeId: number, private deviceType: string, private active: boolean, private deviceModel: DeviceModel) {

    }

    public isWpu(): boolean {
        return this.DeviceType === 'wpu';
    }

    public isBwp(): boolean {
        return this.DeviceType === 'bwp';
    }

    public isPulse(): boolean {
        return this.DeviceType.startsWith('pulse');
    }
}