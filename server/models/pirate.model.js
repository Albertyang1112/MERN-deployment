const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long."]
    },
    image: {
        type: String,
        required: [true, "Must have image"]
    },
    numChests: {
        type: Number,
        required: [true, "No treasures? No pirate"],
    },
    catchPhrase: {
        type: String,
        required: [true, "Must have a catch phrase"],
        minlength: [3, "Must be at least 3 characters long"]
    },
    position: {
        type: String,
        required: [true, "Must have position"]
    },
    features: [{
        type: String,
        enum: ["pegLeg", "eyePatch", "hookHand"]
    }]

}, {timestamps: true})

const Pirate = mongoose.model("Pirate", PirateSchema);

module.exports = Pirate;