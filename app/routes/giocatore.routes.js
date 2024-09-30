module.exports = function (app) {
  var giocatore = require("../services/giocatore.service");


  app.get("/api/giocatore/:id_partita", giocatore.getGiocatori);

  app.get("/api/giocatore/:id_partita/:id_giocatore", giocatore.getGiocatore);

  app.put("/api/giocatore/createGiocatore", giocatore.createGiocatore);

  app.put("/api/giocatore/assegnazionePersonaggi", giocatore.assegnazionePersonaggi);

  app.put("/api/giocatore/votaGiocatore", giocatore.gestisciVoto);

  app.put("/api/giocatore/azzeraPunteggi", giocatore.azzeraPunteggi);

  app.put("/api/giocatore/eliminaGiocatore", giocatore.eliminaGiocatore);
};
