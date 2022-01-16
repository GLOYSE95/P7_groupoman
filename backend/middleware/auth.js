const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

module.exports = (req, res, next) => {
  try {
    //recupere le token
    const token = req.headers.authorization.split(" ")[1];
    //decodage du token
    const decodedToken = jwt.verify(token, `${process.env.TOKENKEY}`);
    //recupération de l'id
    const userId = decodedToken.id;
    if (req.body.id && req.body.id !== userId) {
      throw "User ID non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Requête invalide") });
  }
};
