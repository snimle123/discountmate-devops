const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple hello route
app.get('/hello', (req, res) => {
  res.send('Hello from DiscountMate!');
});

// Health check route (for monitoring)
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start server
app.listen(PORT, () => {
  console.log(`DiscountMate running on port ${PORT}`);
});

module.exports = app;
