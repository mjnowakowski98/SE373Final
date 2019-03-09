const InvalidArgumentException = require("./invalidargumentexception.js");
const Tile = require("./tile.js");

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