const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* User model Queries */
const FindAdminUserByID = require("../../adminModels/queries/user/FindAdminUserByID");
/* update log */
const getAllUpdatesLog = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllUpdates;
module.exports = {
  index(req, res, next) {
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render("../../../important/admin/views/updater/updater", {
        content: "",
        title: "",
        author: "",
        keywords: "",
        infoLogs: getAllUpdatesLog(),
        theUser: user
      });
    });
  } /* end of update index function */,
  makeUpdate(req, res, next){
    switch (req.params.update) {
        case "core":
          require("../../../AristosStuff/AristosUpdater/aristosUpdater").coreUpdate(
            req
          );
          break;
        case "expansions":
          require("../../../AristosStuff/AristosUpdater/aristosUpdater").expansionUpdate(
            req
          );
          break;
        case "theme":
          require("../../../AristosStuff/AristosUpdater/aristosUpdater").themeUpdate(
            req
          );
          break;
        default:
          break;
      }
      res.redirect("back");
  }/* end of make update function */
};
