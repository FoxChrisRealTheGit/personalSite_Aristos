const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
/* controller */
const updateController = require("../../controllers/updater/admin_updater_controller");

/* GET updater page  */
router.get("/", isAdmin, updateController.index);

/*
*   GET make updates
*/
router.get("/make-update/:update", isAdmin, updateController.makeUpdate);

/* Exports */
module.exports = router;
