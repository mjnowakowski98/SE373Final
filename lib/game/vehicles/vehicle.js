class Vehicle {
	constructor(_orientation, _color, _length) {
		let orientation = _orientation;
		this.getOrientation = () => orientation;

		let color = _color;
		this.getColor = () => color;

		let length = _length;
		this.getLength  = () => length;

		let position = [0,0];
		this.getPosition = () => position;
		this.setPosition = (_position) => position = _position;
	}
}

module.exports = Vehicle;