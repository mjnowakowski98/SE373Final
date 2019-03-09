const Vehicle = require("./vehicle.js");

class Car extends Vehicle {
	constructor(orientation, color) {
		super(orientation, color, 2);
	}
}

module.exports = Car;