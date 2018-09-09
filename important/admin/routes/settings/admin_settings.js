const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const settingsController = require("../../controllers/settings/admin_settings_controller");
/*
* GET, POST admin settings
*/
router
  .route("/")
  .get(isAdmin, settingsController.index)
  .post(settingsController.create);

/*
* POST site favicon
*/
router.post("/favicon", settingsController.favicon);
/*
* POST site brand
*/
router.post("/brand", settingsController.brand);

/*
* GET admin settings cancel
*/
router.get("/cancel", isAdmin, settingsController.cancel);

/* Exports */
module.exports = router;
        