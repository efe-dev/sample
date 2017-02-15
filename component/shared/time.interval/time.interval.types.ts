export enum TimeInterval {
    NotSet = 0,
    Minute = 1,
    QuarterOfAnHour = 15,
    Hour = 60,
    BiHour = 2 * Hour,
    Day = 24 * Hour,
    Week = 7 * Day,
    Month = 30 * Day,
    Year = 365 * Day
}