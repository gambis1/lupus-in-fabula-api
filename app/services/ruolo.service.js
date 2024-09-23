var Ruolo = require("../models/ruolo/ruolo.model");

// getRuoli
exports.get = async (req, res) => {
  try {
    var items = await Ruolo.find();
    res.send(items);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// getRuolo
exports.getItem = async (req, res) => {
  try {
    var item = await Ruolo.findOne({ code: req.params.code }).exec();
    res.send(item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

