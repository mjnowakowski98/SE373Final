class Tile {
	constructor() {
		let vehicleTile = null;
		this.getVehicleTile = () => vehicleTile;
		this.setVehicleTile = (_vehicleTile) => vehicleTile = _vehicleTile;
	}
}

module.exports = Tile;