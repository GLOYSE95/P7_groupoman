const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Posts routes
router.post("/", multer, commentCtrl.createComment);
router.put("/:id", multer, commentCtrl.updateComment);
router.delete("/:id", commentCtrl.deleteComment);
router.get("/:id", commentCtrl.findOneComment);
router.get("/", commentCtrl.findAllComment);

// router.delete("/:id", auth, commentCtrl.deleteComment);
// router.get("/:id", auth, commentCtrl.findOneComment);
// router.get("/", auth, commentCtrl.findAllComment);

module.exports = router;
