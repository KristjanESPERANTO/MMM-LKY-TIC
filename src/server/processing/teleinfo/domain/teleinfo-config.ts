export interface TeleinfoConfiguration {
  baudRate: number;
  dataBits: 5 | 6 | 7 | 8;
  developer: {
    mockRefreshRate: number;
    serialPortMockEnabled: boolean;
  },
  powerFactor: number;
  serialDevice: string;
  stopBits: 1 | 2;
}
