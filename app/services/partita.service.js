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
      votazioni_aperte: false,
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

exports.gestisciVotazioni = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    item.votazioni_aperte = !item.votazioni_aperte;
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

    var countGiocatori = 0;
    delete _req.id_partita;
    Object.entries(_req).forEach(([key, value]) => {
      if (_req[key] === null) _req[key] = 0;
      countGiocatori += value;
    });
    if (countGiocatori != item.giocatori.length) throw { message: "Impossibile continuare il numero associato dei giocatori è diverso dai giocatori che si sono inseriti" };
    item.numero_personaggi = _req;
    var dati = await item.save();
    res.send(dati);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deletePartita = async (req, res) => {
  try {
    await Partita.deleteOne({ id_partita: req.params.id_partita }).exec();
    res.send({ fine_partita: true });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
