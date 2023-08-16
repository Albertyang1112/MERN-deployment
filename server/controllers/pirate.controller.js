const Pirate = require("../models/pirate.model");

module.exports.createPirate = (req, res) => {
    Pirate.create(req.body)
        .then((pirate) => res.json({pirate: pirate}))
        .catch((err) => res.status(400).json(err));
};

module.exports.findAllPirates = (req, res) => {
    Pirate.find()
        .then((allPirates) => {res.json({allPirates: allPirates})})
        .catch((err) => res.status(400).json(err));
}; 

module.exports.findOnePirate = (req, res) => {
    Pirate.findOne({_id: req.params.id})
        .then(pirate => res.json({pirate: pirate}))
        .catch(err => res.status(400).json(err));
};

module.exports.updatePirate = (req, res) => {
    Pirate.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
        )
        .then(pirate => res.json({pirate: pirate}))
        .catch(err => res.status(400).json(err));
};

module.exports.deletePirate = (req, res) => {
    Pirate.deleteOne({_id: req.params.id})
        .then(result => res.json({result: result}))
        .catch(err => res.status(400).json(err));
};