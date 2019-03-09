class Session {
	constructor(_key) {
		let key = _key;
		this.getKey = () => key;

		let expires = new Date();
		expires.setDate(expires.getDate() + 1);
		this.getExpires = () => expires;
	}
}

module.exports = Session;