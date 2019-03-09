class Session {
	constructor(_key) {
		let key = _key;
		this.getKey = () => key;

		let board = null;
		this.getBoard = () => board;
		this.setBoard = (_board) => board = _board;

		let expires = new Date();
		this.getExpires = () => expires;
		this.renewSession = function() {
			let newDate = new Date(expires);
			newDate.setDate(newDate.getDate() + 1);
			expires = newDate;
			console.log(expires);
		}
		this.renewSession();
	}
}

module.exports = Session;