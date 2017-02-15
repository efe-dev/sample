export class StreetAddress {
    private formatted:string;
    private id: string;
    private street: string;
    private city: string;
    private municipality: string;
    private province: string;
    private houseNumber: number;
    private houseNumberAddition: string;
    private postcode: string;
    private countryCode: string;

    public get Id(): string { return this.id; }
    public get Formatted(): string { return this.formatted; }
    public get Street(): string {return this.street;}
    public get City(): string {return this.city;}
    public get Municipality(): string {return this.municipality;}
    public get Province(): string {return this.province;}
    public get HouseNumber(): number {return this.houseNumber;}
    public get HouseNumberAddition(): string {return this.houseNumberAddition;}
    public get Postcode(): string {return this.postcode;}
    public get CountryCode(): string {return this.countryCode;}

    private constructor() { }

    public static createFromRequest(rawData: any) {
        if (!rawData) {
            throw new Error('Expect raw data to exist');
        }
        if (!rawData.id) {
            throw new Error('Expect raw data to contain id');
        }
        let streetAddress = new StreetAddress();
        streetAddress.id = rawData.id;
        streetAddress.formatted = rawData.formatted;
        streetAddress.street = rawData.street;
        streetAddress.city = rawData.city;
        streetAddress.municipality = rawData.municipality;
        streetAddress.province = rawData.province;
        streetAddress.houseNumber = parseInt(rawData.houseNumber);
        streetAddress.houseNumberAddition = rawData.houseNumberAddition;
        streetAddress.postcode = rawData.postcode;
        streetAddress.countryCode = rawData.countryCode;
        return streetAddress;
    }
}