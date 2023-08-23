const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/users");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
