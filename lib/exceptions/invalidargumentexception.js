class InvalidArgumentException extends Error {
	constructor(message) {
		super(message);
		this.name = "InvalidArgumentError";
	}
}

module.exports = InvalidArgumentException;