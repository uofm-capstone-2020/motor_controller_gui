/* probably need a system here where we have all parameters, and a preset min
  and max value for them. Then, we can compare the reading to its min and max
  to determine its background colour */

export type Favourite = {
  name: string;
  value: string;
  color: string;
};

const favourites: Favourite[] = [
  { name: "Sensor 1", value: "31", color: "white" },
  { name: "Sensor 2", value: "65", color: "rgb(255,153,153)" },
  { name: "Sensor 3", value: "12", color: "rgb(214,250,255)" },
];

export default favourites;
