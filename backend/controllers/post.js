const fs = require("fs");
const db = require("../models");
const post = db.posts;
const user = db.users;

exports.createPost = (req, res, next) => {
  if (!req.body.contain) {
    res.status(400).send({ message: "Le contenu ne doit pas être vide!" });
    return;
  }
  post
    .create({
      contain: req.body.contain,
      imagepost: req.body.imagepost,
      userId: req.params.id,
    })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = (req, res, next) => {
  try {
    post.update(
      {
        contain: req.body.contain,
        imagepost: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json({
      message: "Post modifié",
    });
  } catch (err) {
    console.log("Echec de la modification du post");
  }
};

//ajouter contraintes si userid == user.id || admin + auth aux routes
exports.deletePost = (req, res) => {
  post
    .findOne({ where: { id: req.params.id } })
    .then(() => {
      post
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) =>
      res.status(500).json({ message: "Echec de la suppression" })
    );
};

exports.findOnePost = (req, res) => {
  post
    .findByPk(req.params.id)
    .then((post) => {
      if (post) {
        res.send(post);
      } else {
        res.status(404).send({
          message: "Impossible de trouver ce post",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur",
      });
    });
};

exports.findAllPost = (req, res) => {
  post
    .findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
