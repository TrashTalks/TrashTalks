'use strict';
const router = require("express").Router();

const getModel= require(`../../models/Employees.js`);
    
router.route('/employee').post(getModel.update);
module.exports =router;