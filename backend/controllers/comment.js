const db = require("../models");
const comment = db.comments;

//models comment :
//id /contain/userId: allowNull: true / postId: allowNull: true

exports.createComment = (req, res, next) => {
  if (!req.body.contain) {
    res.status(400).send({ message: "Le contenu ne doit pas être vide!" });
    return;
  }
  comment
    .create({
      contain: req.body.contain,
      postId: req.body.postId,
      userId: req.body.userId,
    })
    .then(() => res.status(201).json({ message: "commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateComment = (req, res, next) => {};

exports.deleteComment = (req, res, next) => {
  comment
    .findOne({ where: { id: req.params.id } })
    .then(() => {
      comment
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) =>
      res.status(500).json({ message: "Echec de la suppression" })
    );
};

exports.findOneComment = (req, res, next) => {
  comment
    .findOne({ id: req.params.id })
    .then((comment) => res.status(200).json(comment))
    .catch((comment) =>
      res.status(404).json({ message: "commentaire non trouvé" })
    );
};

exports.findAllComment = (req, res, next) => {
  comment
    .findAll()
    .then((comment) => res.status(200).json(comment))
    .catch((error) =>
      res.status(400).json({ message: "Aucun commentaire trouvé" })
    );
};
