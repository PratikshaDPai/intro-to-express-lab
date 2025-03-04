const express = require("express");
const validator = require("validator");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});
// Define the route with a dynamic parameter ":username"
app.get("/greetings/:username", (req, res) => {
  const username = req.params;
  const greetings = [
    `Hello there, ${username}!`,
    `What a delight it is to see you, ${username}.`,
    `${username}, you look nice today!`,
    `Greetings, ${username}! I hope you have a fantastic day!`,
  ];

  const responseMessage =
    greetings[Math.floor(Math.random() * greetings.length)];

  res.send(responseMessage);
});

// Define the route with a dynamic parameter ":number"
app.get("/roll/:num", (req, res) => {
  const num = String(req.params.num);
  if (!validator.isInt(num, { min: 1 })) {
    res.send("You must specify a number");
  }
  const dieNum = parseInt(num, 10);
  const responseMessage = Math.floor(Math.random() * dieNum) + 1;

  res.send(responseMessage.toString()); //was facing an error since number was being interpreted as status code
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
