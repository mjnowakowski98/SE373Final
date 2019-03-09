const config = require("./config.js");
const Server = require("./lib/server.js");

let server = new Server(config.server.listenPort, config.keyGenOptions);
server.startServer();