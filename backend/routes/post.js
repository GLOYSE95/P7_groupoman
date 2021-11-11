const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Posts routes
router.post("/:id", multer, postCtrl.createPost);
router.put("/:id", multer, postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.get("/:id", postCtrl.findOnePost);
router.get("/", postCtrl.findAllPost);

// router.delete("/:id", auth, postCtrl.deletePost);
// router.get("/:id", auth, postCtrl.findOnePost);
// router.get("/", auth, postCtrl.findAllPost);

module.exports = router;
