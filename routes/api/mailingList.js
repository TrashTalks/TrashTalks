'use strict';
const router = require('express').Router();  
const getModel = require('../../models/MailingList.js');

router.route("/:id").get(getModel.read);
router.route("/").post(getModel.update);
router.route("/delete/:id").post(getModel.delete);
module.exports = router;