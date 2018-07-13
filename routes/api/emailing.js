"use strict";
const router = require("express").Router();
const getModel = require("../../models/Emailing.js");

router.route("/contactUs").post(getModel.contactUs);
module.exports = router;
