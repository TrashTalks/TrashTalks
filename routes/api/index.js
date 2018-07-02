const router = require("express").Router();
const employeeRoutes = require("./employee");
const mailingListRoutes = require("./mailingList");
const materialRoutes = require("./material");
// const nodeMailerRoutes = require("./nodeMail");

//Routes
router.use("/employee", employeeRoutes);
router.use("/mailingList", mailingListRoutes);
router.use("/material", materialRoutes);
// router.use("/nodeMail",nodeMailerRoutes);
module.exports = router;
