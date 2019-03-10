const QueryString = require("querystring");
const express = require("express");
const hbs = require("hbs");
const session = require("express-session");

const PuzzleLoader = require("../game/board/puzzleloader.js");

class Server {
    constructor(serverConfig) {
        let listenPort = serverConfig.listenPort;
        let appRoot = serverConfig.appRoot;

        let getQueries = function(url) {
            let queries = null;
            let urlSplitArr = url.split('?');
            if(urlSplitArr.length == 2) queries = QueryString.parse(urlSplitArr[1]);
            else {
                queries = {
                    fileName:null,
                    selectedTile:null,
                    moveOffset:null
                }
            }
            return queries;
        }

        this.startServer = function () {
            let app = express();
            app.set("view engine", "handlebars");
            app.use(express.urlencoded({ extended: true }));
            app.use(express.static(appRoot + "/public"));

            hbs.registerPartials(appRoot + "/views/partials");

            app.use(session({
                secret: 'supersecretstring',
                resave:false,
                saveUninitialized:false,
                cookie: {}
            }));

            app.get("/game", (req, res) => {
                let queries = getQueries(req.url);

                let board = req.session.board;
                if (!board && !queries.fileName) {
                    res.render("loadpuzzle.hbs");
                    return;
                } else if(!board) {
                    board = PuzzleLoader.loadPuzzle(queries.fileName);
                    req.session.board = board;
                }
                res.render("gameview.hbs", { board });
            });

            app.listen(listenPort, () => console.log(`Listening on: ${ listenPort }`));
        }
    }
}

module.exports = Server;