'use strict';

module.exports = function(router) {
    const express = require('express');
    const bodyParser = require('body-parser');

    function getModel () {
    return require(`../../models/Employees.js`);
    }

    // Automatically parse request body as form data
    router.use(bodyParser.urlencoded({ extended: false }));

    // Set Content-Type for all responses for these routes
    router.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    next();
    });

    router.post('/employee', (req, res, next) => {
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