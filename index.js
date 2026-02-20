const express = require('express');
const session = require('express-session');
const app = express();

const port = 4000;

// Import database connection
const connectDB = require('./config/db.js');

// Import routes
const routes = require('./routes/routes.js');

// Connect to database
connectDB();

// Set view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mySecretKey123',
  resave: false,
  saveUninitialized: true
}));

// Use routes
app.use('/', routes);

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});