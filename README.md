# UMSAE Telemetry GUI 

This is the packdock-side interface for the UMSAE Formula Electric team. It is a fork from a capstone from 2020, originally authored by Ian Sweetland.
<br>This project, based on node.js, will be used to interface with various vehicle systems wirelessly including:
* Live sensor reading
* Exporting data to csv
* Altering state of the vehicle

## Included Modules:
### [Electron.js](https://www.electronjs.org/ "Electron.js")
* Builds application for a cross-platfrom desktop app

### [React.js](https://reactjs.org/ "React.js")
* Standard reactive application framework

### [Styled Components](https://styled-components.com/docs "Styled Components")
* Makes styling your components with CSS easier

### [SerialPort](https://serialport.io/docs/ "SerialPort")
* Data streams from COM port, interface to the vehicle

### [d3.js](https://d3js.org/ "d3.js")
* Plotting data


## How to operate:

To contribute to the development of this project as a UMSAE member, you must have node.js installed. 
* [Node.js](https://nodejs.org/en/download/ "Node.js Download")

Once you have Node.js installed, you can run "npm start" to start a development host.
<br> If you want to see the app in a desktop window, open a new command line and run "npm run electron"

