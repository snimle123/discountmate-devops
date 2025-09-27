// backend/app.js
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.send("Hello from DiscountMate!");
});

app.get('/health', (req, res) => {
  res.json({ status: "UP" });
});

module.exports = app;
