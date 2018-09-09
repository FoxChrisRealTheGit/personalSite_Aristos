const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "portfolioSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json",
                    { route: "./routes/admin_portfolio_projects.js" }
                  );
                }
              }
            );
          }
        }
      });
    });
    /* default portfolio routes */
    fs.pathExists(
      "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioRoutes.json",
            { route: "./routes/admin_portfolio_projects.js" }
          );
        }
      }
    );
    fs.pathExists(
      "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoriesRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoriesRoutes.json",
            { route: "./routes/admin_portfolio_projects_categories.js" }
          );
        }
      }
    );
    /* end of default portfolio routes */
    /* default portfolio model routes */
    fs.pathExists(
      "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json",
            { route: "../../project.js" }
          );
        }
      }
    );
    fs.pathExists(
      "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json",
            { route: "../../projectCategory.js" }
          );
        }
      }
    );
    /* end of default portfolio model routes */
  }
};