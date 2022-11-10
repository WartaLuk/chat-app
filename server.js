const express = require("express");

const app = express();

const messages = [];

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("client/index.html");
});


app.listen(8008, () => {
    console.log("Server is running on port: 8008");
  });
  