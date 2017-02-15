
export class DeviceModel {
    public get Id(): number { return this.id; }
    public get Name(): string { return this.model; }

    private constructor(private id: number, private model: string) { }

    public static createFromRawResponse(raw: any): DeviceModel {
        if (!raw) {
            throw new Error('Expect raw data to be provided');
        }
        if (!raw.id || !raw.name) {
            throw new Error('Expect raw data to contain id and name');
        }
        const model = new DeviceModel(raw.id, raw.name);
        return model;
    }
}