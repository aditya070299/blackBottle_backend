const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/auth");
const dotenv = require("dotenv");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Mock user data
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.get("/", (req, res) => {
  res.json("Wellcome to Black_Bottle backend ");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user === null) return res.status(400).send("user not found");

  const accessToken = jwt.sign({ username, password }, process.env.JWT_SECRET);

  res.json(accessToken);
});

app.get("/api/home", authenticateToken, (req, res) => {
  res.send("You are in a protected route");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
