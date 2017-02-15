export class Project {
  public get Id(): number { return this.id; }
  public get City(): string { return this.city; }
  public get Name(): string { return this.name; }
  public get HouseCount(): number { return this.houseCount; }

  constructor(private id: number, private city: string, private name: string, private houseCount: number) { }
}