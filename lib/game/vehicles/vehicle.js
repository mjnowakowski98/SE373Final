class Vehicle {
	constructor(_orientation, _color, _length) {
		let orientation = _orientation;
		this.getOrientation = () => orientation;

		let color = _color;
		this.getColor = () => color;

		let length = _length;
		this.getLength  = () => length;
	}
}

module.exports = Vehicle;