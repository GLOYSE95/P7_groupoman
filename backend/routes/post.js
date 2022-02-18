const { authJwt } = require("../middleware");
const postCtrl = require("../controllers/post");

const multer = require("../middleware/multer-config");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/:id", [authJwt.verifyToken], multer, postCtrl.createPost);
  app.put("/:id", [authJwt.verifyToken], multer, postCtrl.updatePost);
  app.delete("/:id", [authJwt.verifyToken], postCtrl.deletePost);
  app.get("/:id", [authJwt.verifyToken], postCtrl.findOnePost);
  app.get("/", [authJwt.verifyToken], postCtrl.findAllPost);
};
