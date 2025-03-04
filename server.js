const express = require("express");
const validator = require("validator");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});
// Define the route with a dynamic parameter ":username"
app.get("/greetings/:username", (req, res) => {
  const username = req.params.username;
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

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index;
  if (!validator.isInt(index, { min: 0, max: collectibles.length - 1 })) {
    res.send("This item is not yet in stock. Check back soon!");
  }

  const responseMessage = `So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`;

  res.send(responseMessage);
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

app.get("/shoes", (req, res) => {
  let minPrice = req.query["min-price"];
  let maxPrice = req.query["max-price"];
  let type = req.query.type;

  let filteredShoes = [...shoes]; // Start with full shoe list

  // Convert prices to numbers and validate
  if (minPrice !== undefined) {
    minPrice = parseFloat(minPrice);
    if (isNaN(minPrice)) return res.send("min-price must be a number.");
    filteredShoes = filteredShoes.filter((shoe) => shoe.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    maxPrice = parseFloat(maxPrice);
    if (isNaN(maxPrice)) return res.send("max-price must be a number.");
    filteredShoes = filteredShoes.filter((shoe) => shoe.price <= maxPrice);
  }

  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.json(filteredShoes);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000/");
});
