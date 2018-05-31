const router = require("express").Router();
const employeeRoutes = require("./employee");
const mailingListRoutes = require("./mailingList");

// Book routes
router.use("/employee", employeeRoutes);
router.use("/mailingList", mailingListRoutes);

module.exports = router;
