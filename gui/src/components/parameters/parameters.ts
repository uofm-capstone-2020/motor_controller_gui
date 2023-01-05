import profiles from "./profiles";

type ParameterType = "float" | "int";

export type Parameter = {
  name: string;
  description: string;
  type: ParameterType;
  unit: string;
  value: string;
  validation: (param: string) => boolean;
  valid: boolean;
};

export type Parameters = Parameter[];

const defaultProfile = profiles[0];

const parameters: Parameters = [
  {
    name: "Max Torque",
    description: "Maxiumum torque",
    type: "int",
    unit: "N*m",
    value: defaultProfile.presets[0],
    validation: (val) => isInt(val),
    valid: true,
  },
  {
    name: "Max whl spd",
    description: "Maxiumum wheel speed",
    type: "int",
    unit: "Rad/s",
    value: defaultProfile.presets[1],
    validation: (val) => isInt(val),
    valid: true,
  },
  {
    name: "Max Speed",
    description: "Maxiumum wheel speed",
    type: "int",
    unit: "km/h",
    value: defaultProfile.presets[2],
    validation: (val) => isInt(val),
    valid: true,
  },
  {
    name: "Max Slip Ratio",
    description: "Maxiumum wheel speed",
    type: "float",
    unit: "-",
    value: defaultProfile.presets[3],
    validation: (val) => isFloat(val),
    valid: true,
  },
  //   {
  //       name: 'Pmax',
  //       description: 'Maxiumum operating power',
  //       type: 'int',
  //       unit: 'kW',
  //       value: '100',
  //       validation: (val) => isInt(val),
  //       valid: true
  //   },
  // {
  //     name: 'Tmax',
  //     description: 'Maxiumum torque',
  //     type: 'int',
  //     unit: 'N*m',
  //     value: '255',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'Ld',
  //     description: 'Stator d-axis inductance',
  //     type: 'float',
  //     unit: 'H',
  //     value: '79e-6',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'Lq',
  //     description: 'Stator q-axis inductance',
  //     type: 'float',
  //     unit: 'G',
  //     value: '79e-6',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'L0',
  //     description: 'Stator zero-sequence inductance',
  //     type: 'float',
  //     unit: 'H',
  //     value: '0',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'Rs',
  //     description: 'Stator resistance per phase',
  //     type: 'float',
  //     unit: 'Ohm',
  //     value: '8e-3',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'psim',
  //     description: 'Permanent magnet flux linkage',
  //     type: 'float',
  //     unit: 'Wb',
  //     value: '0.0355',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'p',
  //     description: 'Number of pole pairs',
  //     type: 'int',
  //     unit: '−',
  //     value: '10',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'motorTemp_max',
  //     description: 'Maxiumum motor temperature',
  //     type: 'int',
  //     unit: 'C',
  //     value: '120',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'motorTemp_corner',
  //     description: 'Corner motor temperature',
  //     type: 'int',
  //     unit: 'C',
  //     value: '100',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'rpm_max',
  //     description: 'Maximum rotational speed of the motor',
  //     type: 'int',
  //     unit: 'RPM',
  //     value: '6500',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'ke_ll_rpm',
  //     description: 'Back emf constant',
  //     type: 'float',
  //     unit: 'Vrmsll/rpm',
  //     value: '0.0478',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'fsw',
  //     description: 'PMSM drive switching frequency',
  //     type: 'int',
  //     unit: 'Hz',
  //     value: '16e3',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'bw_idq_hz',
  //     description: '???',
  //     type: 'int',
  //     unit: 'Hz',
  //     value: '1600',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'n_rpm',
  //     description: 'Number of points per dimension in the current reference lookup table',
  //     type: 'int',
  //     unit: '−',
  //     value: '14',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'n_tq',
  //     description: 'Number of points per dimension in the torque reference lookup table',
  //     type: 'int',
  //     unit: '−',
  //     value: '6',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 't_ramp',
  //     description: 'Ramp time?',
  //     type: 'float',
  //     unit: 's',
  //     value: '0.05',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'igbtTemp_max',
  //     description: 'Maxiumum IGBT temperature',
  //     type: 'int',
  //     unit: 'C',
  //     value: '150',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'igbtTemp_corner',
  //     description: 'Corner IGBT temperature',
  //     type: 'int',
  //     unit: 'C',
  //     value: '100',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'wi',
  //     description: 'HF injection frequency',
  //     type: 'float',
  //     unit: 'rad/s',
  //     value: '628.32',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'wt',
  //     description: 'Test rotational frequency',
  //     type: 'float',
  //     unit: 'rad/s',
  //     value: '6.2832',
  //     validation: isFloat,
  //     valid: true
  // },
  // {
  //     name: 'Vhf_mag',
  //     description: 'Magnitude of injection voltage',
  //     type: 'int',
  //     unit: 'Vrms',
  //     value: '20',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'Tq_trigger',
  //     description: 'Torque value to trigger data logging',
  //     type: 'int',
  //     unit: 'Nm',
  //     value: '100',
  //     validation: isInt,
  //     valid: true
  // },
  // {
  //     name: 'rpm_trigger',
  //     description: 'RPM value to trigger data logging',
  //     type: 'int',
  //     unit: 'rpm',
  //     value: '1000',
  //     validation: isInt,
  //     valid: true
  // }
];

export function isFloat(f: string) {
  const floatRegex = /^-?\d+(?:[.,]?\d*?)?(?:e-?\d*?)?$/;
  if (!floatRegex.test(f)) return false;

  const val = Number(f);
  if (isNaN(val)) return false;
  return true;
}

export function isInt(i: string) {
  const intRegex = /^-?\d+(?:e?\d*)?$/;
  if (!intRegex.test(i)) return false;

  const intVal = Number(i);
  return !isNaN(intVal);
}

export default parameters;
