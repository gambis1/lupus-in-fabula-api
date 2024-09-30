module.exports = function (app) {
  var ruolo = require("../services/ruolo.service");


  app.get("/api/ruolo", ruolo.get);

  app.get("/api/ruolo/:code", ruolo.getItem);
};
