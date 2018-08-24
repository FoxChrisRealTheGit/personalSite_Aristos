require("./routes/admin_portfolio_routes_checker").theFunction();
const adminPortfolioProjectsCategories = require("./routes/admin_portfolio_projects_categories");

const fs = require("fs-extra");
const adminPortfolioProject = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/portfolioRoutes.json"
).route;
const adminPortfolioProjects = require(adminPortfolioProject);

module.exports = app => {
  app.use("/admin/portfolio", adminPortfolioProjects);
  app.use("/admin/portfolio-categories", adminPortfolioProjectsCategories);
};
