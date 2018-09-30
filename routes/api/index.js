const router = require("express").Router();
const employeeRoutes = require("./employee");
const mailingListRoutes = require("./mailingList");
const materialRoutes = require("./material");
const emailingRoutes = require("./emailing");
const updateRoutes = require("./updates");
const binRoutes = require("./bin");
const userRoutes = require("./user");
//Routes
router.use("/employee", employeeRoutes);
router.use("/mailingList", mailingListRoutes);
router.use("/material", materialRoutes);
router.use("/emailing", emailingRoutes);
router.use("/updates", updateRoutes);
router.use("/bin", binRoutes);
router.use("/user", userRoutes);
module.exports = router;
