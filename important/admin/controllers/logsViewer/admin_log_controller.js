/* the logs stuffs */
const getAllInfoLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllInfo;
const getAllErrorLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllError;
const getAllDebugLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllDebug;
const getAllUpdateLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllUpdates;

/* clear log stuff */
const clearInfoLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .clearInfoLog;
const clearErrorLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .clearErrorLog;
const clearDebugLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .clearDebugLog;
/* user model queries */
const FindAdminUserByID = require("../../adminModels/queries/user/FindAdminUserByID");

module.exports = {
  index(req, res, next) {
    const allTheInfo = getAllInfoLogs();
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render("../../../important/admin/views/logsViewer/logsViewer", {
        content: "",
        logname: "info",
        infoLogs: allTheInfo,
        theUser: user
      });
    });
  } /* end of logs index function */,
  indexByCategory(req, res, next) {
    let log, logname;
    if (req.params.logname === "errors") {
      log = getAllErrorLogs();
      logname = "error";
    } else if (req.params.logname === "debug") {
      log = getAllDebugLogs();
      logname = "debug";
    } else if (req.params.logname === "updates") {
      log = getAllUpdateLogs();
      logname = "updates";
    } else {
      log = getAllInfoLogs();
      logname = "info";
    }
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render("../../../important/admin/views/logsViewer/logsViewer", {
        content: "",
        logname: logname,
        infoLogs: log,
        theUser: user
      });
    });
  } /* end of logs by name function */,
  clearLog(req, res, next) {
    if (req.params.logname === "error") {
      clearErrorLogs();
    } else if (req.params.logname === "debug") {
      clearDebugLogs();
    } else {
      clearInfoLogs();
    }
    res.redirect("back");
  } /* end of clear lgo function */
};