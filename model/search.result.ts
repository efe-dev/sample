export class SearchResult {
    private houseId: number;
    private projectId: number;
    private address: string;

    public get HouseId(): number { return this.houseId; }
    public get ProjectId(): number { return this.projectId; }
    public get Address(): string { return this.address; }

    private constructor() { }

    public static createFromResponse(rawData: any): SearchResult {
        if (!rawData) {
            throw new Error('Expect raw data to exist');
        }
        if (!rawData.houseId || !rawData.projectId) {
            throw new Error('Expect raw data to have at least house id, project id');
        }

        const result = new SearchResult();
        result.houseId = parseInt(rawData.houseId);
        result.projectId = parseInt(rawData.projectId);
        result.address = rawData.address;
        return result;
    }
}