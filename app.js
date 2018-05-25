'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const config = require('./config');
const routes = require("./routes");
const proxy = require('http-proxy-middleware');


const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//Use for local testing. Comment out once deployed
app.use('/', proxy({target: 'loc alhost:8080', changeOrigin: true}));

// Redirect root to /employees
// app.get('/', (req, res) => {
//   res.redirect('/employees');
// });

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

if (module === require.main) {
  // Start the server
  const server = app.listen(config.get('PORT'), () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

module.exports = app;
