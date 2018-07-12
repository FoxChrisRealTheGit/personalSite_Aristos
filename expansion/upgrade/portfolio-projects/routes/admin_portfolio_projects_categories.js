const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const portfolioProjectCategoriesController = require("../controllers/admin_portfolio_projects_categories_controller");

/*
* GET portfolio category index
*/
router.get("/", isAdmin, portfolioProjectCategoriesController.index);
/*
* GET, POST add portfolio category
*/
router
  .route("/add-portfolio-category")
  .get(isAdmin, portfolioProjectCategoriesController.addIndex)
  .post(portfolioProjectCategoriesController.create);

/*
* GET, POST edit portfolio category
*/
router
  .route("/edit-portfolio-category/:id")
  .get(isAdmin, portfolioProjectCategoriesController.editIndex)
  .post(portfolioProjectCategoriesController.edit);

/*
* GET delete portfolio category
*/
router.delete(
  "/delete-portfolio-category/:id",
  isAdmin,
  portfolioProjectCategoriesController.delete
);
/* 
* POST reorder projects
*/
router.post("/reorder-projects", portfolioProjectCategoriesController.reorder);

/* Exports */
module.exports = router;
