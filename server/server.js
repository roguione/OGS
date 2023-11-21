// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs'); // Require EJS
const app = express();

// Load environment variables from a .env file if needed

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory

// Connect to the database
mongoose.connect('mongodb://localhost/outdoor_grocery_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up routes (you'll implement these in server/routes)
const huntingRoutes = require('./server/routes/hunting');
app.use('/api/hunting', huntingRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
