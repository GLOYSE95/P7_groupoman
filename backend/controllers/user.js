const db = require("../models");
const user = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken"); //genere un token
const bcrypt = require("bcrypt"); //cryptage du mot de passe

const dotenv = require("dotenv");
const result = dotenv.config();
const models = require("../models");
// const { USER } = require("../configuration/dbconfig");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    user
      .create({
        prenom: req.body.prenom,
        nom: req.body.nom,
        password: hash,
        email: req.body.email,
        descript: req.body.descript,
      })
      .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

exports.login = (req, res) => {
  user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "email non trouvé." });
      }
      var token = jwt.sign({ id: user.id }, `${process.env.TOKENKEY}`, {
        expiresIn: "24h",
      });
      bcrypt.compare(req.body.password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          id: user.id,
          accessToken: token,
        });
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

//TODO : supprimer mpd
exports.getAllUsers = (req, res) => {
  user
    .findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//TODO : supprimer mpd
exports.getOneUser = (req, res) => {
  user
    .findOne({ id: req.params.id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user && user.accessToken) {
//     // for Node.js Express back-end
//     return { "x-access-token": user.accessToken };
//   } else {
//     return {};
//   }
// }
