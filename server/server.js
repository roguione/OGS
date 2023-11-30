// ogs/server.js

// Require and configure dotenv
require("dotenv").config();

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const mongoUrl = process.env.DATABASE_URL;
const huntingRoutes = require("./routes/hunting");
const ejs = require("ejs");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const port = process.env.PORT || 3000;

// Create an Express application
const app = express();

// Add Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Set up static file serving
app.use("/public", express.static(__dirname + "/public"));

// Connect to the database
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// CSP config that magically worked.
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data:; font-src 'self' data:;"
  );
  next();
});

// Define a route for the root URL
app.get("/", (req, res) => {
  res.render("index");
});

// Set up routes and Define a route for /status/updateSuccess
app.use("/api/hunting", huntingRoutes);
app.get('/status/updateSuccess', (req, res) => {
  res.render('status/updateSuccess');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
