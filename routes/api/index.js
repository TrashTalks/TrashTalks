const router = require("express").Router();
const employeeRoutes = require("./employee");
const mailingListRoutes = require("./mailingList");
const materialRoutes = require("./material");

//Routes
router.use("/employee", employeeRoutes);
router.use("/mailingList", mailingListRoutes);
router.use("/material", materialRoutes);
module.exports = router;
