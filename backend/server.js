const express = require("express");
const jwt = require("jwt-simple");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

const users = [{ username: "admin", password: "password" }];

const products = [
  {
    id: 1,
    "data category": "Firmographic",
    "Record count": 5250,
    fields: "Company name, Company address, Website",
  },
  {
    id: 2,
    "data category": "Dermology",
    "Record count": 45670,
    fields: "Company name, Company address, Website",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.encode({ username }, "secret-key");
  res.json({ token });
});

app.get("/products", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    jwt.decode(token, "secret-key"); 
    res.json(products);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

app.get("/products/:id", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    jwt.decode(token, "secret-key"); 
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
