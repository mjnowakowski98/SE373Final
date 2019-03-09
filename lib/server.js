const Http = require("http");
const Fs = require("fs");
const QueryString = require("querystring");
const Cookies = require("cookies");

const Session = require("./session.js");
const Util = require("./util.js");
const Board = require("./board.js");

class Server {
	constructor(_listenPort, _keyGenOptions) {
		let listenPort = _listenPort;
		let keyGenOptions = _keyGenOptions;
		let server = null;
		let sessions = null;

		this.loadPuzzle = function(fileName) {
			Fs.readFile()
		}

		this.startServer = function() {
			sessions = new Array();

			server = Http.createServer((req, res) => {
				let session = null;
				let cookies = new Cookies(req, res);
				let sessionKey = cookies.get("SessionKey");
				if(!sessionKey) {
					let newKey = Util.generateKey(keyGenOptions);
					cookies.set("SessionKey", newKey);
					session = new Session(newKey);
					sessions.push(session);
				} else {
					let ndx = sessions.length;
					while(--ndx >= 0 && sessions[ndx].getKey() != sessionKey) continue;
					if(ndx >= 0) session = sessions[ndx];
				}

				res.setHeader("Access-Control-Allow-Origin", '*');

				if(req.method == "OPTIONS") {
					res.statusCode = 200;
					res.setHeader("Access-Control-Allow-Methods", "GET, POST");
					res.setHeader("Access-Control-Allow-Headers", "Content-Type");
					res.end();
				}

				let queries = null;
				let urlSplitArr = req.url.split('?');
				if(urlSplitArr.length == 2) queries = QueryString.parse(urlSplitArr[1]);
				switch(queries.action) {
					case "loadPuzzle":
						if(queries.fileName) {
							let puzzleJson = Fs.readFileSync(`${__dirname}/../puzzles/${queries.fileName}`);
							let puzzleDescriptor = JSON.parse(puzzleJson);
							let board = new Board(puzzleDescriptor.board.numGridRows, puzzleDescriptor.board.numGridCols, puzzleDescriptor.board.exitRow);
							session.setBoard(board);
						}

						res.statusCode = 200;
						res.setHeader("Content-Type","application/json");

						/*let boardString = JSON.stringify(board.output());
						res.end(boardString);*/
						break;
					default:
						break;
				}
			});

			server.listen(listenPort, () => console.log(`Listening on ${listenPort}`));
		}
	}
}

module.exports = Server;