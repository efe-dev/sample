export interface DataFormatting {
    zones?: number[];
    zonesPattern?: string[];
    min?: number;
    max?: number;
    gaugeDataFilter?(array: Float32Array): number;
    showInDeviceWidget: boolean;
    showAsGauge?: boolean;
    showInGraph: boolean;
    index: number;
}