module.exports = function (app) {
  var giocatore = require("../services/giocatore.service");

  app.get("/api/giocatore/:id_partita", giocatore.getGiocatori);

  app.get("/api/giocatore/:id_partita/:id_giocatore", giocatore.getGiocatore);

  app.put("/api/giocatore/createGiocatore", giocatore.createGiocatore);

  app.put("/api/giocatore/assegnazionePersonaggi", giocatore.assegnazionePersonaggi);
};
