'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function getModel () {
  return require(`./model-${require('../config').get('DATA_BACKEND')}`);
}

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));

// Set Content-Type for all responses for these routes
router.use((req, res, next) => {
  res.set('Content-Type', 'text/html');
  next();
});

/**
 * GET /employees
 *
 * Display a page of employees (up to ten at a time).
 */
router.get('/', (req, res, next) => {
  getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('employees/list.pug', {
      employees: entities,
      nextPageToken: cursor
    });
  });
});

/**
 * GET /employees/add
 *
 * Display a form for creating a employee.
 */
// [START add_get]
router.get('/add', (req, res) => {
  res.render('employees/form.pug', {
    employee: {},
    action: 'Add'
  });
});
// [END add_get]

/**
 * POST /employees/add
 *
 * Create a employee.
 */
// [START add_post]
router.post('/add', (req, res, next) => {
  const data = req.body;

  // Save the data to the database.
  getModel().create(data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(`${req.baseUrl}/${savedData.id}`);
  });
});
// [END add_post]

/**
 * GET /employees/:id/edit
 *
 * Display a employee for editing.
 */
router.get('/:employee/edit', (req, res, next) => {
  getModel().read(req.params.employee, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('employees/form.pug', {
      employee: entity,
      action: 'Edit'
    });
  });
});

/**
 * POST /employees/:id/edit
 *
 * Update a employee.
 */
router.post('/:employee/edit', (req, res, next) => {
  const data = req.body;

  getModel().update(req.params.employee, data, (err, savedData) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(`${req.baseUrl}/${savedData.id}`);
  });
});

/**
 * GET /employees/:id
 *
 * Display a employee.
 */
router.get('/:employee', (req, res, next) => {
  getModel().read(req.params.employee, (err, entity) => {
    if (err) {
      next(err);
      return;
    }
    res.render('employees/view.pug', {
      employee: entity
    });
  });
});

/**
 * GET /employees/:id/delete
 *
 * Delete a employee.
 */
router.get('/:employee/delete', (req, res, next) => {
  getModel().delete(req.params.employee, (err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect(req.baseUrl);
  });
});

/**
 * Errors on "/employees/*" routes.
 */
router.use((err, req, res, next) => {
  // Format error and forward to generic error handler for logging and
  // responding to the request
  err.response = err.message;
  next(err);
});

module.exports = router;
