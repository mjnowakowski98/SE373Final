const config = require("./config.js");
const Server = require("./lib/server/server.js");

let server = new Server(config.server, config.keyGenOptions);
server.startServer();
server.updatePuzzles();