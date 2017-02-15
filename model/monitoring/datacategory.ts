export enum DataCategory {
    NotSet = 0,

    BoilerEnergyConsumed = 10,
    EnergyConsumed,
    EnergyGenerated,
    EnergyBudget,

    BoilerHighTemp = 30,
    BoilerLowTemp,
    AmbientTemp,
    OutsideTemp,
    SetpointTemp,

    TimeModeOff = 60,
    TimeModeCentralHeating,
    TimeModeHotWater,
    TimeModeCooling,

    PulseCounter = 80,
}
