const faults: {[key in Faults]: {state: boolean, description: string}} = {
    'HIGH VDC': {
        state: false,
        description: ""
    }, 
    'DFSDM TIMEOUT': {
        state: false,
        description: ""
    },
    'HIGH IA': {
        state: false,
        description: ""
    },
    'HIGH IB': {
        state: false,
        description: ""
    },
    'HIGH IC': {
        state: false,
        description: ""
    },
    'IABC SPI': {
        state: false,
        description: ""
    },
    'RDC CRC': {
        state: false,
        description: ""
    },
    'RDC FAULT REG': {
        state: false,
        description: ""
    },
    'HIGH MOTOR TEMP': {
        state: false,
        description: ""
    },
    'HIGH IGBT TEMP': {
        state: false,
        description: ""
    },
    'IGBT THERMISTOR': {
        state: false,
        description: ""
    },
    'ADC': {
        state: false,
        description: ""
    },
    'GATE DRIVER': {
        state: false,
        description: ""
    },
    'LOW BATTERY': {
        state: false,
        description: ""
    },
    'HARD FAULT': {
        state: false,
        description: "It's b0rked."
    }
}
let faultFlag: boolean = false;

export function getFaults(){
    return faults
}

export function getFaultFlag(){
    return faultFlag
}

export function clearFaults(){
    Object.keys(faults).forEach((f: Faults) => {
        faults[f].state = false;
    })
    faultFlag = false;
}

export function parseFaults(reg: number){
    let mask;
    let flag = false;
    Object.keys(faults).forEach((f: Faults, i) => {
        mask = 1 << i;
        if((reg & mask) != 0){
            faults[f].state = true
            flag = true;
        }
        else{
            faults[f].state = false;
        }
    })
    faultFlag = flag;
}

type Faults = 
    'HIGH VDC' | 
    'DFSDM TIMEOUT' |
    'HIGH IA' |
    'HIGH IB' |
    'HIGH IC' |
    'IABC SPI' |
    'RDC CRC' |
    'RDC FAULT REG' |
    'HIGH MOTOR TEMP' |
    'HIGH IGBT TEMP' |
    'IGBT THERMISTOR' |
    'ADC' |
    'GATE DRIVER' |
    'LOW BATTERY' |
    'HARD FAULT'