import { LabelNames } from './lang-constants';
import { DataUnit, DataCategory } from '../../../model';

export const EN_LANG_CODE = 'en';

export const EN_TRANSLATE = {

    'Login': 'Login',
    'Search': 'Search',
    [LabelNames.Loading]: 'Loading...',
    [LabelNames.NoData]: 'No Data',
    'First Page': 'First Page',
    'Previous': 'Previous',
    'Next': 'Next',
    'Last Page': 'Last Page',

    // Navbar
    'Projects': 'Projects',
    'Analysis': 'Analysis',

    // Errors
    [LabelNames.ErrorProject]: 'You cannot see the details of this project',
    [LabelNames.ErrorStreetaddress]: 'You cannot see the details of this street address',
    [LabelNames.ErrorDevice]: 'You cannot see the details of this device',

    // Project-Detail
    'More Details': 'More Details',

    // Breadcrumbs
    'Projects Overview': 'Project Overview',

    //House-Detail
    'Wheather': '',
    'Products': 'Products',
    'Houses': 'Houses',
    'House': 'House',
    'Installed Devices': 'Installed Devices',
    'Celsius': 'Celsius',
    'kWh': 'kWh',
    'Counter': 'kWh',
    'Percent': '%',

    //Device components
    'BoilerLowTemp': 'Temp Low',
    'BoilerHighTemp': 'Temp High',
    'OutsideTemp': 'Temp Outside',
    'AmbientTemp': 'Temp Ambient',
    'SetpointTemp': 'Setpoint Temp',
    'BoilerEnergyConsumed': 'Hot water consumed',
    'EnergyConsumed': 'Energy Consumed',
    'EnergyGenerated': 'Energy Generated',
    'EnergyBudget': 'Remaining budget',
    'TimeModeCentralHeating': 'Time Central Heating',
    'TimeModeCooling': 'Time Cooling',
    'TimeModeHotWater': 'Time Hot Water',
    'TimeModeOff': 'Time Off',
    [LabelNames.ErrorGetData]: 'Cannot load the requested data',

    //Device Analysis
    'Today': 'Today',
    'Last Week': 'Last Week',
    'Last Month': 'Last Month',
    'Year': 'Year',
    'Hours': 'Hours',
    'Days': 'Days',
    'Months': 'Months',
    'Unknown-DataUnit': 'The indicated data unit cannot be displayed',

    //Device Details
    'Product details': 'Product details',
    'Id': 'Id',
    'Model': 'Model',
    'Last Communication': 'Last Communication',
    'Status': 'Status',
    'Active': 'Active',
    'Inactive': 'Inactive'
}

