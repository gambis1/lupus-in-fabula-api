var mongoose = require("mongoose");
var Ruolo = require("../ruolo/ruolo.model");

var Giocatore = mongoose.Schema({
  _id: false,
  identificativo: { type: String, required: false },
  nome: { type: String, required: false },
  ruolo: { type: Ruolo, require: false },
  in_vita: { type: Boolean, required: false }
});

module.exports = Giocatore;


