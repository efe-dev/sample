export class BreadCrumbModel {
    public constructor(private trail: { [id: string]: string }){}

    public getParts() {
        return Object.keys(this.trail);
    }

    public getUrl(part: string) {
        return this.trail[part];
    }
}