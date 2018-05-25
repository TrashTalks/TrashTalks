'use strict';
const router = require("express").Router();

const getModel= require(`../../models/Employees.js`);
    
router.route('/').post(getModel.update);
router.route("/:id").get(getModel.read);
module.exports =router;