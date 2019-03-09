const InvalidArgumentException = require("./invalidargumentexception.js");
const Tile = require("./tile.js");
const VehicleOrientation = require("./vehicleorientation.js");
const RedCar = require("./redcar.js");
const Truck = require("./truck.js");
const Car = require("./car.js");

class Board {
	constructor(_numGridRows, _numGridCols, _exitRow, vehicles) {
		let numGridRows = _numGridRows;
		let numGridCols = _numGridCols;
		this.getNumGridRows = () => numGridRows;
		this.getNumGridCols = () => numGridCols;

		let exitRow = 0;
		if (_exitRow < _numGridRows) exitRow = _exitRow;
		else throw new InvalidArgumentException(`Exit row (${_exitRow}) must be less than number of rows (${_numGridRows}).`);
		this.getExitRow = () => exitRow;

		let tiles = new Array();
		for(let rowNdx = 0; rowNdx < numGridRows; rowNdx++) {
			tiles.push(new Array());
			for(let colNdx = 0; colNdx < numGridCols; colNdx++)
				tiles[rowNdx].push(new Tile());
		}
		this.getTiles = () => tiles();

		let createVehicle = function(vehicleDesc) {
			let newVehicle = null;
			let orientation = null;
			if(vehicleDesc.orientation == "horizontal") orientation = VehicleOrientation.HORIZONTAL;
			else if(vehicleDesc.orientation == "vertical") orientation = VehicleOrientation.VERTICAL;

			switch(vehicleDesc.type) {
				case "car":
					newVehicle = new Car(orientation);
					break;

				case "truck":
					newVehicle = new Truck(orientation);
					break;

				default:
					break;
			}

			return newVehicle;
		}

		let redCar = new RedCar(vehicles.redCar.colNdx);
		let traffic = new Array();
		for(let i = 0; i < vehicles.traffic.length; i++) {
			traffic.push(createVehicle(vehicles.traffic[i]));
		}


		this.output = function() {
			let outputObj = {
				numGridRows:numGridRows,
				numGridCols:numGridCols,
				exitRow:exitRow
			}

			return outputObj;
		}
	}
}

module.exports = Board;