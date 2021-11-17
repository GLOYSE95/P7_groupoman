const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", [auth.verifyToken, auth.isUser], userCtrl.updateUser);
// [auth.verifyToken, auth.isUser, auth.isAdmin]
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
