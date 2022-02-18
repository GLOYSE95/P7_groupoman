const { authJwt } = require("../middleware");
const express = require("express");
const commentCtrl = require("../controllers/comment");
const multer = require("../middleware/multer-config");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/", multer, commentCtrl.createComment);
  app.put("/:id", multer, commentCtrl.updateComment);
  app.delete("/:id", commentCtrl.deleteComment);
  app.get("/:id", commentCtrl.findOneComment);
  app.get("/", commentCtrl.findAllComment);
};
