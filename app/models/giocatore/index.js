var mongoose = require("mongoose");
var Giocatore = require("./giocatore.model");

module.exports = mongoose.model("Giocatore", Giocatore);
