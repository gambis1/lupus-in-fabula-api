module.exports = function (app) {
  var ruolo = require("../services/ruolo.service");

  
  app.get("/api/ruoli", ruolo.get);

  app.get("/api/ruoli/:code", ruolo.getItem);
};
