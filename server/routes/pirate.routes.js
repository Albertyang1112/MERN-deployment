const PirateController = require("../controllers/pirate.controller");

module.exports = app => {
    app.post("/api/pirates", PirateController.createPirate);
    app.get("/api/pirates", PirateController.findAllPirates);
    app.get("/api/pirates/:id", PirateController.findOnePirate);
    app.patch("/api/pirates/:id", PirateController.updatePirate);
    app.delete("/api/pirates/:id", PirateController.deletePirate);
}