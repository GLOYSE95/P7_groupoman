const db = require("../models");
const user = db.users;
const Op = db.Sequelize.Op;

const dotenv = require("dotenv");
const result = dotenv.config();
const models = require("../models");

exports.signup = (req, res, next) => {
  user
    .create({
      prenom: req.body.prenom,
      nom: req.body.nom,
      password: req.body.password,
      email: req.body.email,
      descript: req.body.descript,
    })
    .then((user) => {
      res.send({ message: "Utilisateur enregistré!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
  user
    .findOne({ where: { email: req.body.email } })
    .then((mail) => {
      if (!mail) {
        return res.status(404).send({ message: "email non trouvé." });
      }
      user
        .findOne({ where: { password: req.body.password } })
        .then((password) => {
          if (!password) {
            return res.status(401).send({ message: "mot de passe invalide." });
          } else {
            console.log("utilisateur trouvé");
          }
        });
    })
    .catch((error) => res.status(500).json({ message: "erreur serveur." }));
};

exports.updateUser = (req, res, next) => {
  user
    .update(
      {
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: req.body.password,
        descript: req.body.descript,
      },
      {
        where: { id: req.params.id },
      }
    )
    .then(res.json({ message: "Utilisateur modifié" }))
    .catch((error) =>
      res.status(304).json({ message: "Utilisateur non modifié" })
    );
};

exports.deleteUser = (req, res, next) => {
  user
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id == req.params.id) {
        user
          .destroy({ where: { id: user.id } })
          .then(() => res.status(200).json({ message: "Utilisateur supprimé" }))
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) =>
      res.status(500).json({ message: "Echec de la suppression" })
    );
};
