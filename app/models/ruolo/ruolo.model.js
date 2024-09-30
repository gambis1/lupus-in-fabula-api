var mongoose = require("mongoose");

var Ruolo = mongoose.Schema({
  _id: false,
  name: { type: String, required: false },
  code: { type: String, required: false },
  description_role: { type: String, required: false },
  image: { type: String, required: false }
});

module.exports = Ruolo;
