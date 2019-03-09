const config = require("./config.js");
const Server = require("./lib/server/server.js");

let server = new Server(config.server.listenPort, config.keyGenOptions);
server.startServer();

const PuzzleLoader = require("./lib/game/board/puzzleloader.js");
let pl = new PuzzleLoader();
let board = pl.loadPuzzle("puzzle1");