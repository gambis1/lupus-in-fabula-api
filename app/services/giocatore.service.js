var Partita = require("../models/partita.model");
var Ruolo = require("../models/ruolo/index");
var Giocatore = require("../models/giocatore/index");

exports.getGiocatori = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    res.send(item.giocatori);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getGiocatore = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.params.id_partita }).exec();
    var giocatore = item.giocatori.find((g) => g.identificativo == req.params.id_giocatore);
    res.send(giocatore);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createGiocatore = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    if (!item) throw { message: "Partita non trovata. Inserire il codice della partita corretto." };
    if (item.inizio_partita) throw { message: "Partita già iniziata. Impossiible entrare nella partita." };
    var _req = req.body;
    var giocatore = new Giocatore({
      nome: _req.nome,
      identificativo: generateIdGiocatore(),
      ruolo: null,
      in_vita: true
    });
    item.giocatori.push(giocatore);
    await item.save();
    res.send({ idGiocatore: giocatore.identificativo });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

var generateIdGiocatore = () => {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

exports.assegnazionePersonaggi = async (req, res) => {
  try {
    var item = await Partita.findOne({ id_partita: req.body.id_partita }).exec();
    var ruoli = await Ruolo.find();
    var numeroPersonaggi = Object.assign({}, item.numero_personaggi);
    var giocatori = item.giocatori;
    giocatori.sort((a, b) => {
      if (a.identificativo < b.identificativo) return -1;
      if (a.identificativo > b.identificativo) return 1;
      return 0;
    });
    var indexGiocatori = 0;
    for (var i = 0; i < ruoli.length; i++) {
      var ruolo = ruoli[i];
      for (var j = indexGiocatori; j < giocatori.length; j++) {
        if (numeroPersonaggi[ruolo.code] > 0) {
          giocatori[j].ruolo = new Ruolo({
            name: ruolo.name,
            code: ruolo.code,
            description_role: ruolo.description_role
          });
          numeroPersonaggi[ruolo.code]--;
          indexGiocatori++;
        } else break;
      }
    }
    var dati = await item.save();
    res.send(dati);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
