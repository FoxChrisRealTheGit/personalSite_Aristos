/* this should properly know the plugins and upgrade currently available to send to the app */
const fs = require("fs-extra");

/* async path checking */
const blogCheck = fs.pathExists("expansion/upgrade/blog");
const productCheck = fs.pathExists("expansion/upgrade/products");
const projectManagementCheck = fs.pathExists(
  "expansion/upgrade/project-management"
);
const portfolioCheck = fs.pathExists("expansion/upgrade/portfolio-projects");
const contactCheck = fs.pathExists("expansion/upgrade/contact");

module.exports = app => {
  Promise.all([
    blogCheck,
    productCheck,
    projectManagementCheck,
    portfolioCheck,
    contactCheck
  ]).then(results => {
    if (results[0]) {
      app.locals.blogsExists = true;
      require("./upgrade/blog")(app);
    } else {
      app.locals.blogsExists = false;
    }
    if (results[1]) {
      app.locals.productsExists = true;
      require("./upgrade/products")(app);
    } else {
      app.locals.productsExists = false;
    }
    if (results[2]) {
      app.locals.projectManagementExists = true;
      require("./upgrade/project-management")(app);
    } else {
      app.locals.projectManagementExists = false;
    }
    if (results[3]) {
      app.locals.portfolioManagementExists = true;
      require("./upgrade/portfolio-projects")(app);
    } else {
      app.locals.portfolioManagementExists = false;
    }
    if (results[4]) {
      app.locals.contactManagementExists = true;
      require("./upgrade/contact")(app);
    } else {
      app.locals.contactManagementExists = false;
    }
  });
  /* check plugins */
  fs.pathExists("expansion/plugins/printful").then(exists => {
    if (exists) {
      app.locals.printfulPluginExists = true;
    } else {
      app.locals.printfulPluginExists = false;
    }
  });
};
