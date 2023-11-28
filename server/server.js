// server/server.js
// Require and configure dotenv
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Set the views directory

// Set up static file serving
app.use('/public', express.static(__dirname + '/public'));

// Access the MongoDB URL from the environment variable
const mongoUrl = process.env.DATABASE_URL;

// Connect to the database
mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; font-src 'self' data:;"
  );
  next();
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.render('index');
});

// Set up routes (implement these in server/routes)
const huntingRoutes = require('./routes/hunting');
app.use('/api/hunting', huntingRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
