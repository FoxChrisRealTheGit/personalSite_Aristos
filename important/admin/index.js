require("./routes/checkers/media/admin_media_routes_checker").theFunction();
require("./routes/checkers/users/admin_users_routes_checker").theFunction();
const fs = require("fs-extra");
/* begin static core routes */
const adminPages = require("./routes/pages/admin_pages");
const adminHome = require("./routes/dashboard/admin_home");
const adminMediaCategories = require("./routes/media/admin_media_categories");
const adminSettings = require("./routes/settings/admin_settings");
const adminLogsViewer = require("./routes/logsViewer/admin_logs");
const adminTemplateBuilder = require("./routes/templateBuilder/admin_template_builder");
const adminUpdater = require("./routes/updater/admin_updater");
/* end static core routes */
/* begin dynamic routes */
let adminAddMedia, adminUserControls;
/* dynamic media routes */
try {
  const adminAddMedias = fs.readJSONSync(
    "./important/admin/routes/checkers/media/MediaRoutes.json"
  ).route;
  adminAddMedia = require(adminAddMedias);
} catch (err) {
  adminAddMedia = require("./routes/media/admin_add_media");
}
/* dynamic user routes */
try {
  const allTheUserControls = fx.readJSONSync(
    "./important/admin/routes/checkers/users/UserRoutes.json"
  ).route;
  adminUserControls = require(allTheUserControls);
} catch (err) {
  adminUserControls = require("./routes/userControls/admin_user_controls");
}
/* end dynamic routes */
module.exports = app => {
  /* start basic core routes */
  app.use("/admin/add-media", adminAddMedia);
  app.use("/admin/media-categories", adminMediaCategories);
  app.use("/admin/template-builder", adminTemplateBuilder);
  app.use("/admin/pages", adminPages);
  app.use("/admin/settings", adminSettings);
  app.use("/admin/user-controls", adminUserControls);
  app.use("/admin/logs-viewer", adminLogsViewer);
  app.use("/admin/updater", adminUpdater);
  app.use("/admin", adminHome);
  /* end basic core routes */
  /* start expansion and theme load */
  require("../../expansion")(app);
  require("../../content/theme")(app);
  /* end expansion and theme load */
};
