const express = require("express");
const hbs = require("hbs");
const session = require("express-session");

const PuzzleLoader = require("../game/board/puzzleloader.js");

class Server {
    constructor(serverConfig) {
        let listenPort = serverConfig.listenPort;
    }
}

module.exports = server;

const app = express();
app.set("view engine", "handlebars");
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");

app.use(session({
    secret:'derplydoo',
    cookie: { }
}));

app.get("/game", (req, res) => {
    let board = req.session.board;
    if(!board) { res.render("loadpuzzle.hbs"); }
    res.render("gameview.hbs", {board});
});