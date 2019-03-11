const QueryString = require("querystring");
const express = require("express");
const hbs = require("hbs");
const Cookies = require("cookies");
const Fs = require("fs");

const Util = require("../util.js");
const Session = require("./session.js");
const PuzzleLoader = require("../game/board/puzzleloader.js");

class Server {
    constructor(serverConfig, keyGenOptions) {
        let listenPort = serverConfig.listenPort;
        let appRoot = serverConfig.appRoot;

        let sessions = new Array();
        let availablePuzzles = null;

        this.updatePuzzles = function() {
            Fs.readdir(appRoot + "/puzzles", (err, files) => {
                if(err) {
                    console.error(err);
                    return;
                }

                availablePuzzles = new Array();
                for(let i = 0; i < files.length; i++)
                    availablePuzzles.push(files[i]);
            });
        }

        Fs.watch(appRoot + "/puzzles", {persistent:false}, (evt, name) => {
            console.log(`FileWatcher: ${evt} -> ${name}`);
            this.updatePuzzles();
        });

        let findSession = function(sessionId) {
            let session = null;
            let ndx = sessions.length;
            while(--ndx >= 0 && sessions[ndx].getKey() != sessionId) continue;
            if(ndx >= 0) session = sessions[ndx];
            return session;
        }

        let expireSession = function(sessionId) {
            let session = findSession(sessionId);
            if(session) sessions.splice(sessions.indexOf(session), 1);
        }

        let getQueries = function(url) {
            let queries = null;
            let urlSplitArr = url.split('?');
            if(urlSplitArr.length == 2) queries = QueryString.parse(urlSplitArr[1]);
            else queries = new Object();
            return queries;
        }

        this.startServer = function () {
            let app = express();
            app.set("view engine", "hbs");
            app.use(express.urlencoded({ extended: true }));
            app.use(express.static(appRoot + "/public"));

            hbs.registerPartials(appRoot + "/views/partials");

            app.get(["/", "/index"], (req, res) => {
                let cookies = new Cookies(req, res);
                expireSession(cookies.get("sessionId"));
                res.render("index.hbs");
            });

            app.get("/loadPuzzle", (req, res) => {
                let cookies = new Cookies(req, res);
                expireSession(cookies.get("sessionId"));
                res.render("loadpuzzle.hbs", { availablePuzzles });
            });

            app.get("/game", (req, res) => {
                let cookies = new Cookies(req, res);

                let session = findSession(cookies.get("sessionId"));
                if(!session) {
                    let sessionKey = Util.generateKey(keyGenOptions);
                    cookies.set("sessionId", sessionKey);
                    session = new Session(sessionKey);
                    sessions.push(session);
                }

                let queries = getQueries(req.url);

                let board = session.getBoard();
                if (!board && !queries.fileName) {
                    res.render("loadpuzzle.hbs", { availablePuzzles });
                    return;
                } else if(!board || queries.fileName) {
                    board = PuzzleLoader.loadPuzzle(queries.fileName);
                    session.setBoard(board);
                } else if(queries.selectedTileRow && queries.selectedTileCol && queries.offset) {
                    let row = parseInt(queries.selectedTileRow);
                    let col = parseInt(queries.selectedTileCol);
                    let offset = parseInt(queries.offset);
                    board.moveVehicle(row, col, offset);
                }

                res.render("gameview.hbs", { board });
            });

            app.listen(listenPort, () => console.log(`Listening on: ${ listenPort }`));
        }
    }
}

module.exports = Server;