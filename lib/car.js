const Vehicle = require("./vehicle.js");

class Car extends Vehicle {
	constructor(orientation) {
		super(orientation, 2);
	}
}

module.exports = Car;