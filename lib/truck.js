const Vehicle = require("./vehicle.js");

class Truck extends Vehicle {
	constructor(orientation) {
		super(orientation, 3);
	}
}

module.exports = Truck;