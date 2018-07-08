const router = require("express").Router();
const employeeRoutes = require("./employee");
const mailingListRoutes = require("./mailingList");
const materialRoutes = require("./material");
const emailingRoutes = require("./emailing")
//Routes
router.use("/employee", employeeRoutes);
router.use("/mailingList", mailingListRoutes);
router.use("/material", materialRoutes);
router.use("/emailing", emailingRoutes);
module.exports = router;
