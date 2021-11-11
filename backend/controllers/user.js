const bcrypt = require("bcrypt"); //cryptage du mot de passe
const cryptojs = require("crypto-js"); //chiffrement via cle du mail
const jwt = require("jsonwebtoken"); //genere un token
const db = require("../models");
const user = db.users;

const role = db.roles;
const dotenv = require("dotenv");
const result = dotenv.config();
const models = require("../models");

exports.signup = async (req, res, next) => {
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOEMAIL}`)
    .toString();

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      user
        .create({
          prenom: req.body.prenom,
          nom: req.body.nom,
          password: hash,
          email: emailCrypto,
          descript: req.body.descript,
        })
        .then(() => res.status(201).json({ message: "User créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  const emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOEMAIL}`)
    .toString();

  bcrypt.hash(req.body.password, 10).then((hash) => {
    user.findOne({ where: { email: emailCrypto } });
    bcrypt
      .compare(req.body.password, hash)
      .then((valid) => {
        if (valid) {
          res.status(200).json({
            userId: user.id,
            token: jwt.sign({ userId: user.id }, `${process.env.TOKENKEY}`, {
              expiresIn: "24h",
            }),
          });
          console.log("connexion ok");
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.updateUser = (req, res, next) => {
  emailCrypto = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CRYPTOEMAIL}`)
    .toString();
  passwordHash = bcrypt.hash(req.body.password, 10);
  try {
    user.update(
      {
        email: emailCrypto,
        nom: req.body.nom,
        prenom: req.body.prenom,
        password: passwordHash,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json({
      message: "User Updated",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = (req, res, next) => {
  user
    .findOne({ where: { id: req.params.id } })
    // console.log(req.params.id);
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
