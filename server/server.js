require("dotenv").config();
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
const app = require("./app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    if (!token) {
      throw new Error("Token not provided");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.error("Socket authentication error:", err.message);
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      try {
        const user = await User.findOne({ _id: socket.userId });
        const newMessage = new Message({
          chatroom: chatroomId,
          user: socket.userId,
          message,
        });

        await newMessage.save();

        console.log("Message saved successfully:", message);

        io.to(chatroomId).emit("newMessage", {
          message,
          name: user.name,
          userId: socket.userId,
        });
      } catch (error) {
        console.error("Error sending chatroom message:", error.message);
      }
    }
  });
});
