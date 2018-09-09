const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const userControlsController = require("../../controllers/userControls/admin_user_controls_controller");
const userRoleController = require("../../controllers/userControls/admin_user_role_controller");
/*
* GET user controls index
*/
router.get("/", isAdmin, userControlsController.index);
/*
* GET admin roles index
*/
router.get("/admin-roles", isAdmin, userRoleController.index);

/*
* GET, POST add admin user
*/
router
  .route("/add-admin")
  .get(isAdmin, userControlsController.addIndex)
  .post(userControlsController.createAdmin);

/*
* GET, POST add admin user role
*/
router
  .route("/add-admin-role")
  .get(isAdmin, userRoleController.addIndex)
  .post(userRoleController.create);

/*
* GET, POST edit admin user role
*/
router
  .route("/edit-admin-role/:id")
  .get(isAdmin, userRoleController.editIndex)
  .post(userRoleController.saveEdit);

/* 
* POST regular user
*/
router.post("/register-user", userControlsController.createUser);

/*
* GET, POST edit admin user
*/
router
  .route("/edit-admin/:id")
  .get(isAdmin, userControlsController.editIndex)
  .post(userControlsController.saveEdit);

/*
* GET remove admin user
*/
router.delete("/remove-admin/:id", isAdmin, userControlsController.remove);

/*
* Get remove admin role
*/
router.delete("/remove-admin-role/:id", isAdmin, userRoleController.remove);

/* Exports */
module.exports = router;
