export class Address {
    private id: number;
    private countryId: string;
    private line1: string;
    private line2: string;
    private line3: string;
    private zipOrPostcode: string;
    private stateProvinceCounty: string;
    private otherAddressDetails: string;
    private locality: string;

    public get Id(): number { return this.id; }
    public get CountryId(): string { return this.countryId; }
    public get Line1(): string { return this.line1; }
    public get Line2(): string { return this.line2; }
    public get Line3(): string { return this.line3; }
    public get ZipOrPostcode(): string { return this.zipOrPostcode; }
    public get StateProvinceCounty(): string { return this.stateProvinceCounty; }
    public get OtherAddressDetails(): string { return this.otherAddressDetails; }
    public get Locality(): string { return this.locality; }

    constructor() { }

    public static createFromRequest(rawData: any) {
        if (!rawData) {
            throw new Error('Expect raw data to exist');
        }
        if (rawData.id === null || rawData.id === undefined || isNaN(parseInt(rawData.id))) {
            throw new Error('Expect raw data to contain id');
        }
        let address = new Address();
        address.id = parseInt(rawData.id);
        address.countryId = rawData.countryId;
        address.line1 = rawData.line1;
        address.line2 = rawData.line2;
        address.line3 = rawData.line3;
        address.zipOrPostcode = rawData.zipOrPostcode;
        address.stateProvinceCounty = rawData.stateProvinceCounty;
        address.otherAddressDetails = rawData.otherAddressDetails;
        address.locality = rawData.locality;
        return address;
    }
}
