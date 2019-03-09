const Car = require("./car.js");
const VehicleOrientation = require("./vehicleorientation.js");

class RedCar extends Car {
	constructor() {
		super(VehicleOrientation.HORIZONTAL);
	}
}

module.exports = RedCar;