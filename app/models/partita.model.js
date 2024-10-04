var mongoose = require("mongoose");
var Giocatore = require("./giocatore/giocatore.model");

var Partita = mongoose.Schema({
  id_partita: { type: String, required: true },
  inizio_partita: { type: Boolean, required: false },
  fine_partita: { type: Boolean, required: false },
  votazioni_aperte: { type: Boolean, required: false },
  giocatori: [Giocatore],
  numero_personaggi: {type: mongoose.Schema.Types.Mixed, required: false},
});

module.exports = mongoose.model("Partita", Partita);