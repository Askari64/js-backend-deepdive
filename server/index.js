const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/about", (req, res) => {
  //using query parameters - http://localhost:8000/about?name=arg
  res.send(`Hello ${req.query.name}.`);
});

app.listen(8000, () => console.log("🟢Server Started"));