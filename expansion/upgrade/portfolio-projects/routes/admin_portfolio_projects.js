const express = require("express");
const router = express.Router();

const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const portfolioProjectsController = require("../controllers/admin_portfolio_projects_controller");

/*
* GET Project index
*/
router.get("/", isAdmin, portfolioProjectsController.index);

/*
* GET, POST add portfolio Project
*/
router
  .route("/add-project")
  .get(isAdmin, portfolioProjectsController.addIndex)
  .post(portfolioProjectsController.create);
/*
* GET, POST edit Product
*/
router
  .route("/edit-project/:id")
  .get(isAdmin, portfolioProjectsController.editIndex)
  .post(portfolioProjectsController.edit);

/*
* POST project gallery
*/
router.post("/project-gallery/:id", portfolioProjectsController.createGallery);

/*
* GET delete image
*/
router.delete(
  "/delete-image/:image",
  isAdmin,
  portfolioProjectsController.deleteImage
);

/*
* GET delete Project
*/
router.delete(
  "/delete-project/:id",
  isAdmin,
  portfolioProjectsController.deleteProject
);

/* 
* POST reorder projects
*/
router.post("/reorder-projects", portfolioProjectsController.reorder);

/* Exports */
module.exports = router;
