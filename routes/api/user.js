"use strict";

const router = require("express").Router();
const getModel = require("../../models/User.js");

router.route("/").get(getModel.read);
module.exports = router;
