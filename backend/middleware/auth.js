const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.TOKENKEY}`);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("Requête invalide") });
  }
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Vous n'êtes pas administrateur",
      });
      return;
    });
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Utilisateur requis",
      });
      return;
    });
  });
};

const auth = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
};

module.exports = auth;
