const router = require("express").Router();
const employeeRoutes = require("./employees");
const mailingListRoutes = require("./mailingList");

// Book routes
router.use("/employees", employeeRoutes);
router.use("/mailingList", mailingListRoutes);

module.exports = router;
