class Session {
	constructor(_key) {
		let key = _key;
		this.getKey = () => key;

		let board = null;
		this.getBoard = () => board;
		this.setBoard = (_board) => board = _board;

		let expires = new Date();
		expires.setDate(expires.getDate() + 1);
		this.getExpires = () => expires;
	}
}

module.exports = Session;