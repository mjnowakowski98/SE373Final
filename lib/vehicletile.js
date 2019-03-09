class VehicleTile {
	constructor(_vehicle, _tileNdx) {
		let vehicle = _vehicle;
		this.getVehicle = () => vehicle;

		let tileNdx = _tileNdx;
		this.getTileNdx = () => tileNdx;
	}
}