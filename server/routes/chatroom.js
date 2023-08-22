const express = require("express");
const router = express.Router();

const { getAllChatrooms, createChatroom } = require("../controllers/chatrooms");

const auth = require("../middlewares/auth");

router.get("/", auth, getAllChatrooms);
router.post("/", auth, createChatroom);

module.exports = router;
