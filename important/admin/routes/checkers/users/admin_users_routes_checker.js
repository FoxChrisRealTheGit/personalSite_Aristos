const fs = require("fs-extra");
const pluginChecker = require("../../../../../expansion/plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "usersSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./important/admin/routes/checkers/users/UserRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./important/admin/routes/checkers/users/UserRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./important/admin/routes/checkers/users/UserRoutes.json",
                    {
                      route: "./routes/userControls/admin_user_controls"
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    /* default routes path */ 
    fs.pathExists(
      "./important/admin/routes/checkers/users/UserRoutes.json",
      (err, exists) => { 
        if (!exists) {
          fs.writeJson(
            "./important/admin/routes/checkers/users/UserRoutes.json",
            {
                route: "./routes/userControls/admin_user_controls"
            }
          );
        }
      }
    );
    /* end of default routes path */
    /* default model routes */
    fs.pathExists(
      "./important/admin/routes/checkers/users/UserModelRoutes.json",
      (err, exists) => {   
        if (!exists) {
          fs.writeJson(
            "./important/admin/routes/checkers/users/UserModelRoutes.json",
            {
              route: "../../user"
            }
          );
        }
      }
    );
    fs.pathExists(
        "./important/admin/routes/checkers/users/UserRoleModelRoutes.json",
        (err, exists) => {   
          if (!exists) {
            fs.writeJson(
              "./important/admin/routes/checkers/users/UserRoleModelRoutes.json",
              {
                route: "../../adminRoles"
              }
            );
          }
        }
      );
    /* end of default model routes */
  }
};