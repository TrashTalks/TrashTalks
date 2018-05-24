'use strict';

module.exports = function(app) {
    const express = require('express');
    const bodyParser = require('body-parser');

    function getModel () {
    return require(`../models/MailingList.js`);
    }

    // Automatically parse request body as form data
    app.use(bodyParser.urlencoded({ extended: false }));

    // Set Content-Type for all responses for these routes
    app.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    next();
    });

    app.get('/mailingList/:id', (req, res, next) => {
        getModel().read(req.params.id, (err, entity) => {
          if (err) {
            next(err);
            return;
          }
          res.json(entity);
        });
      });

    app.post('/mailingList', (req, res, next) => {
    const data = req.body;
     // Save the data to the database.
        getModel().create(data, (err, savedData) => {
            if (err) {
            next(err);
            return;
            }
            res.redirect(`/`);
        });
    });
};