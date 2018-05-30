const router = require("express").Router();
const employeeRoutes = require("./employees");
const mailingListRoutes = require("./mailingList");
const founderInfo = require("./founders");

// Book routes
router.use("/employees", employeeRoutes);
router.use("/mailingList", mailingListRoutes);
router.use("/founderInfo", founderInfo);

module.exports = router;
