require("./routes/checkers/admin_portfolio_routes_checker").theFunction();

const fs = require("fs-extra");
const adminPortfolioProject = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json"
).route;
const adminPortfolioProjectCategory = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoriesRoutes.json"
).route;
const adminPortfolioProjects = require(adminPortfolioProject);
const adminPortfolioProjectsCategories = require(adminPortfolioProjectCategory);
module.exports = app => {
  app.use("/admin/portfolio", adminPortfolioProjects);
  app.use("/admin/portfolio-categories", adminPortfolioProjectsCategories);
};