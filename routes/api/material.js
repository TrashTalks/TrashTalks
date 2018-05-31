'use strict';
const router = require("express").Router();  
const getModel = require(`../../models/Material.js`);

router.route("/").post(getModel.read);
module.exports = router;