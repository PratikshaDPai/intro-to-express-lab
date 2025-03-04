const express = require("express");
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

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
