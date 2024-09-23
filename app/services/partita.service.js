var Partita = require("../models/partita.model");

exports.getPartita = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    res.send(item);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = new Partita({
      id_partita: generateIdPartita(),
      inizio_partita: false,
      giocatori: [],
      numero_personaggi: null,
      fine_partita: false
    });

    var dati = await item.save();
    res.send(dati);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

var generateIdPartita = () => {
  var length = 5,
    charset = "abcdefghijklmnopqrstuvwxyz0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

exports.updateIniziaPartita = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    item.inizio_partita = true;
    var dati = await item.save();
    res.send(dati);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateNumeroPersonaggi = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    var _req = Object.assign({}, req.body);
    delete _req.id_partita;
    item.numero_personaggi = _req;
    var dati = await item.save();
    res.send(dati);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
