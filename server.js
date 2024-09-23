var express = require("express");
var app = express();
app.use(express.static("public"));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));

const cors = require("cors");
const corsOptions = {
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configuring the database
const dbConfig = require("./mongodb.config.json");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
//var env = process.env.NODE_ENV.trim();
var dbUrl = dbConfig.url_dev;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB.");
    process.exit();
  });

require("./app/routes/partita.routes")(app);
require("./app/routes/ruolo.routes")(app);
require("./app/routes/giocatore.routes")(app);

// Create a Server
const PORT = process.env.PORT || 4000;
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
