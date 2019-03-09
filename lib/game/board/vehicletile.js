class VehicleTile {
	constructor(_vehicle, _lengthNdx) {
		let vehicle = _vehicle;
		this.getVehicle = () => vehicle;

		let lengthNdx = _lengthNdx;
		this.getLengthNdx = () => lengthNdx;
	}
}

module.exports = VehicleTile;