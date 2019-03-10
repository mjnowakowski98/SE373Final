const Fs = require("fs");
const Path = require("path");

const appRoot = require("../../../config.js").server.appRoot;

const Board = require("./board.js");
const VehicleFactory = require("../vehicles/vehiclefactory.js");
const RedCar = require("../vehicles/redcar.js");
const VehicleOrientation = require("../vehicles/vehicleorientation.js");

class PuzzleLoader {
    constructor() {}

    static loadPuzzle(fileName) {
        let filePath = Path.resolve("puzzles", fileName);
        let puzzleJson = Fs.readFileSync(filePath);
        let puzzle = JSON.parse(puzzleJson);

        let board = new Board(puzzle.board.numGridRows, puzzle.board.numGridCols, puzzle.board.exitRow);
        let redCar = new RedCar(puzzle.board.vehicles.redCar.colNdx);
        board.addVehicle(redCar, puzzle.board.exitRow, redCar.getColNdx());
        
        for(let i = 0; i < puzzle.board.vehicles.traffic.length; i++) {
            let vehicleDescriptor = puzzle.board.vehicles.traffic[i];
            let orientation = (vehicleDescriptor.orientation == "vertical") ? VehicleOrientation.VERTICAL : VehicleOrientation.HORIZONTAL;
            let vehicle = VehicleFactory.getVehicle(vehicleDescriptor.type, orientation, vehicleDescriptor.color);
            let position = vehicleDescriptor.position;
            board.addVehicle(vehicle, position[0], position[1]);
        }
        return board;
    }
}

module.exports = PuzzleLoader;