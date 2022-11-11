const express = require("express");
const path = require("path");
const socket = require("socket.io");

const app = express();

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, "/client/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

const server = app.listen(8008, () => {
  console.log("Server is running on port: 8008");
});

const io = socket(server);
//??kolejność
io.on("connection", (socket) => {
  console.log("New client! Its id – " + socket.id);

  socket.on("message", (message) => {
    console.log("Oh, I've got something from " + socket.id);
    messages.push(message);
    socket.broadcast.emit("message", message);
  });

  socket.on("user", (userName) => {
    users.push({ id: socket.id, name: userName });
    console.log("USERS", users);
    socket.broadcast.emit("message", {
      author: "Chat Bot",
      content: `<i>${userName} has joined the conversation!`,
    });
  });

  socket.on("disconnect", () => {
    console.log("Oh, socket " + socket.id + " has left");
    const index = users.findIndex((user) => user.id === socket.id);
    console.log("index", index);
    const user = users.find((user) => user.id === socket.id);
    users.splice(index, 1);
    console.log("USERS", users);
    users.length > 0 &&
      socket.broadcast.emit("message", {
        author: "Chat Bot",
        content: `<i>${user.name} has left the conversation!`,
      });
  });
});
