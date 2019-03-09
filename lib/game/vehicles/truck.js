const Vehicle = require("./vehicle.js");

class Truck extends Vehicle {
	constructor(orientation, color) {
		super(orientation, color, 3);
	}
}

module.exports = Truck;