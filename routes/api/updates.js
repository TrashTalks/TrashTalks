"use strict";

const router = require("express").Router();
const getModel = require("../../models/Updates.js");

router.route("/").get(getModel.read);
module.exports = router;
