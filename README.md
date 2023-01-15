# MMM-LKY-TIC

[ ![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)
[![Codeship Status for djey47/MMM-LKY-TIC](https://app.codeship.com/projects/27c90cc5-d5e1-4956-af95-ea1154fffda4/status?branch=master)](https://app.codeship.com/projects/462252)

MagicMirror2 module to display info about home power supply.

Uses [MMM-React-Canvas-ts](https://github.com/djey47/MMM-React-Canvas-ts) as bootstrapper.

## Configuration

### Main
```json
{
  "debug": false,
  "teleinfo": { ... }
}
```

- `debug`: enables (true) or disables (true) additional log messages for development or troubleshooting
- `teleinfo`: see below.

### Teleinfo section

```json
{
  "baudRate": 1200,
  "dataBits": 7,
  "developer": {
    "serialPortMockEnabled": false,
    "mockRefreshRate": 2500
  },
  "powerFactor": .8,
  "serialDevice": "/dev/ttyAMA0",
  "stopBits": 7
}
```

- `baudRate`: transfer speed for serial link
- `dataBits` and `stopBits`: data encoding in bits number from the serial link
- `developer`: advanced settings
  - `serialPortMockEnabled`: enables (true) or disables (false) serial port emulation
  - `mockRefreshRate`: interval in ms for the emulator to receive mock teleinfo
- `powerFactor`: allows to estimate instant power in watts (value will depend on your electrical facilities, see excellent [article](https://www.eaton.com/us/en-us/products/backup-power-ups-surge-it-power-distribution/backup-power-ups/va-versus-watts--eaton.html))
- `serialDevice`: device name to capture teleinfo data from.  

## Utilities

### teleinfo-reader
Small CLI program to diagnose reading of teleinfo data on serial input: `npm run tool:teleinfo-reader`

Configuration is set via `tools/scripts/teleinfo-reader/config/teleinfo-reader.json` file; see 'Teleinfo section' above.

## MISC
