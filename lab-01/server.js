
const express = require("express");

const app = express();
const PORT = 3000;

// Home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to my Lab 1 server!");
});

// About route
app.get("/about", (req, res) => {
  res.status(200).json({
    name: "Narahari Shashivadana",
    section: "CSE(FSD)-2B",
    
  });
});

// Time route
app.get("/time", (req, res) => {
  res.status(200).json({
    currentTime: new Date()
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
