const VehicleTile = require("./vehicletile.js");

class Vehicle {
	constructor(_orientation, _length) {
		let orientation = _orientation;
		this.getOrientation = () => orientation;

		let length = _length;
		this.getLength  = () => length;

		let position = [0, 0];
		this.getPosition = () => position;
		this.setPosition = (_position) => position = _position;

		let tileParts = new Array();
		for(let i = 0; i < tileParts.length; i++)
			tileParts.push(new VehicleTile(i));

		let color = "#FFFFFF";
		this.getColor = () => color;
		this.setColor = (_color) => color = _color;
	}
}

module.exports = Vehicle;