const adminPortfolioProjects = require("./routes/admin_portfolio_projects");
const adminPortfolioProjectsCategories = require("./routes/admin_portfolio_projects_categories");
module.exports = app => {
  app.use("/admin/portfolio", adminPortfolioProjects);
  app.use("/admin/portfolio-categories", adminPortfolioProjectsCategories);
};
