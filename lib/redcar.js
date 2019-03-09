const Car = require("./car.js");
const VehicleOrientation = require("./vehicleorientation.js");

class RedCar extends Car {
	constructor(_colNdx) {
		super(VehicleOrientation.HORIZONTAL);
		let colNdx = _colNdx;
		this.getColNdx = () => colNdx;

		this.setColor("#FF0000");
		this.setColor = () => console.error("Cannot override RedCar Color");
	}
}

module.exports = RedCar;