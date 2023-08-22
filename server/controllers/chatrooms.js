const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res) => {
  try {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) {
      throw new Error("Chatroom name can contain only alphabets.");
    }

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) {
      throw new Error("Chatroom with that name already exists!");
    }

    const chatroom = new Chatroom({
      name,
    });

    await chatroom.save();

    res.json({
      message: "Chatroom created!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
