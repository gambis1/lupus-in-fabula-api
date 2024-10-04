module.exports = function (app) {
  var partita = require("../services/partita.service");


  app.get("/api/partita/:id_partita", partita.getPartita);

  app.get("/api/partita", partita.create);

  app.put("/api/partita/updateInizioPartita", partita.updateIniziaPartita);

  app.put("/api/partita/updateNumeroPersonaggi", partita.updateNumeroPersonaggi);

  app.put("/api/partita/gestisciVotazioni", partita.gestisciVotazioni);

  app.delete("/api/partita/:id_partita", partita.deletePartita);
};
