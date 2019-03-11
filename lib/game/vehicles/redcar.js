const Car = require("./car.js");
const VehicleOrientation = require("./vehicleorientation.js");

class RedCar extends Car {
	constructor(_colNdx) {
		super(VehicleOrientation.HORIZONTAL, "red");
		let colNdx = _colNdx;
		this.getColNdx = () => colNdx;
	}
}

module.exports = RedCar;