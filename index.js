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

const data = [
  "banana",
  "apple",
  "app",
  "barbell",
  "boxing",
  "alpha",
  "cat",
  "car",
  "camera",
  "dog",
  "cat",
  "car",
  "cluster",
  "instance",
];

const demo = () => {
  console.log("testing");
};

app.get("/", (req, res) => {
  res.json("Wellcome to Black_Bottle backend ");
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user == null) return res.status(400).send("user not found");

  const accessToken = jwt.sign({ username, password }, process.env.JWT_SECRET);

  res.status(200).json(accessToken);
});

app.post("/api/pagination", authenticateToken, (req, res) => {
  const currentPage = parseInt(req.query.currentpage);
  console.log("currentPage: ", currentPage);
  const number = currentPage;
  if (isNaN(currentPage) || currentPage < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = startIndex + itemsPerPage - 1;
  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(`item-${i}`);
  }
  console.log("items: ", items);
  res.json(items);
});

app.get("/api/home", authenticateToken, (req, res) => {
  res.send("You are in a protected route");
});

app.get("/api/search", authenticateToken, (req, res) => {
  const searchQuery = req.query.search.toLowerCase();
  console.log("searchQuery: ", searchQuery);
  const newData = data.filter((item) =>
    item.toLowerCase().startsWith(searchQuery)
  );
  console.log("newData: ", newData);
  res.json(newData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
