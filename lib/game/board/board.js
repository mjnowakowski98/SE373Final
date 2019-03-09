const InvalidArgumentException = require("../../exceptions/invalidargumentexception.js");
const Tile = require("./tile.js");
const VehicleTile = require("./vehicletile.js");
const VehicleOrientation = require("../vehicles/vehicleorientation.js");

class Board {
	constructor(_numGridRows, _numGridCols, _exitRow) {
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

		this.printTiles = function() {
			let displayString = "";
			for(let rowNdx = 0; rowNdx < tiles.length; rowNdx++) {
				let col = tiles[rowNdx];
				for(let colNdx = 0; colNdx < col.length; colNdx++) {
					let tile = tiles[rowNdx][colNdx];
					if(tile.getVehicleTile()) displayString += 'V';
					else displayString += 'E';
				}
				displayString += "\n";
			}
			console.log(displayString);
		}

		this.addVehicle = function(vehicle, row, col) {
			if(vehicle.getOrientation() == VehicleOrientation.VERTICAL) {
				let endRow = row + vehicle.getLength();
				for(let rowNdx = row, i = 0; rowNdx < endRow; rowNdx++, i++) {
					let tile = tiles[rowNdx][col];
					if(tile.getVehicleTile()) throw new Error(`Tryed to add ${vehicle} to occupied tile`);

					tile.setVehicleTile(new VehicleTile(vehicle, i));
				}
			} else {
				let endCol = col + vehicle.getLength();
				for(let colNdx = col, i = 0; colNdx < endCol; colNdx++, i++) {
					let tile = tiles[row][colNdx];
					if(tile.getVehicleTile()) throw new Error(`Tryed to add ${vehicle} to occupied tile`);

					tile.setVehicleTile(new VehicleTile(vehicle, i));
				}
			}


		}

		this.moveVehicle = function(row, col, offset) {

		}
	}
}

module.exports = Board;