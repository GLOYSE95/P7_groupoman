const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

//Posts routes
router.post("/", multer, commentCtrl.createComment);
router.put("/:id", auth, multer, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);
router.get("/:id", commentCtrl.findOneComment);
router.get("/", commentCtrl.findAllComment);

module.exports = router;
