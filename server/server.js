require("dotenv").config();
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
