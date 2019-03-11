const InvalidArgumentException = require("../../exceptions/invalidargumentexception.js");
const Tile = require("./tile.js");
const VehicleTile = require("./vehicletile.js");
const VehicleOrientation = require("../vehicles/vehicleorientation.js");

class Board {
	constructor(_name, _numGridRows, _numGridCols, _exitRow) {
		let redCar = null;
		this.setRedCar = (_redCar) => redCar = _redCar;

		let puzzleSolved = false;
		this.getPuzzleSolved = () => puzzleSolved;
		let setSolved = () => puzzleSolved = true;

		let name = _name;
		this.getName = () => name;

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
		this.getTiles = () => tiles;

		this.addVehicle = function(vehicle, row, col) {
			vehicle.setPosition([row, col]);
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
			let selectedVehicleTile = tiles[row][col].getVehicleTile();
			if(!selectedVehicleTile) return;
			let vehicle = selectedVehicleTile.getVehicle();
			let startPosition = vehicle.getPosition();
			let newPosition = [0, 0];
			let endTiles = new Array();
			let vehicleTiles = new Array();

			if(vehicle.getOrientation() == VehicleOrientation.VERTICAL) {
				newPosition = [startPosition[0] + offset, startPosition[1]];
				if(newPosition[0] + vehicle.getLength() > numGridRows || newPosition[0] < 0) return;

				for(let rowNdx = newPosition[0]; rowNdx < newPosition[0] + vehicle.getLength(); rowNdx++) {
					let tmpVt = tiles[rowNdx][col].getVehicleTile();
					if(tmpVt) {
						if(tmpVt.getVehicle() != vehicle) return;
					}
					endTiles.push(tiles[rowNdx][col]);
				}

				for(let rowNdx = startPosition[0]; rowNdx < startPosition[0] + vehicle.getLength(); rowNdx++) {
					vehicleTiles.push(tiles[rowNdx][col].getVehicleTile());
					tiles[rowNdx][col].setVehicleTile(null);
				}
			} else {
				newPosition = [startPosition[0], startPosition[1] + offset];
				if(newPosition[1] + vehicle.getLength() > numGridCols || newPosition[1] < 0) return;

				for(let colNdx = newPosition[1]; colNdx < newPosition[1] + vehicle.getLength(); colNdx++) {
					let tmpVt = tiles[row][colNdx].getVehicleTile();
					if(tmpVt) {
						if(tmpVt.getVehicle() != vehicle) return;
					}
					endTiles.push(tiles[row][colNdx]);
				}

				for(let colNdx = startPosition[1]; colNdx < startPosition[1] + vehicle.getLength(); colNdx++) {
					vehicleTiles.push(tiles[row][colNdx].getVehicleTile());
					tiles[row][colNdx].setVehicleTile(null);
				}
			}

			for(let i = 0; i < vehicleTiles.length; i++)
				endTiles[i].setVehicleTile(vehicleTiles[i]);

			vehicle.setPosition(newPosition);

			let winVt = tiles[exitRow][numGridCols - 1].getVehicleTile();
			if(winVt) {
				if(winVt.getVehicle() == redCar) setSolved();
			}
		}
	}
}

module.exports = Board;