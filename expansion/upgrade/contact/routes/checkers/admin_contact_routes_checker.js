const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "contactSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/contact/routes/contactRoutes.json",
                    {
                      route: "./routes/admin_contact"
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    fs.pathExists(
      "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
            {
              route: "./routes/admin_contact"
            }
          );
        }
      }
    );
  }
};