const Car = require("./car.js");
const Truck = require("./truck.js");


class VehicleFactory {
    constructor() {}

    static getVehicle(vehicleType, orientation, color) {
        let vehicle = null;

        switch(vehicleType) {
            case "car":
                vehicle = new Car(orientation, color);
                break;
            case "truck":
                vehicle = new Truck(orientation, color);
                break;
            default:
                break;
        }
        return vehicle;
    }
}



module.exports = VehicleFactory;