const fs = require("fs-extra");
const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
const config = require("../../../AppStuff/config/config");
/* User queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
const FindAdminUserByID = require("../../adminModels/queries/user/FindAdminUserByID");

module.exports = {
  index(req, res, next) {
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render("../../../important/admin/views/settings/settings", {
        content: "",
        config: config.getAll(),
        theUser: user
      });
    });
  } /* end of index function */,

  create(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let configs = config.getAll();
        let changes = req.body;
        let length = configs.length;
        for (let i = 0; i < length; i++) {
          config.updateItem(configs[i].name, changes[configs[i].name]);
        }
        res.redirect("back");
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,
  favicon(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let newMedia = req.files.image;
        let path = "/images/favicon/" + req.files.image.name;
        config.updateItem("favicon", "system", path);
        fs.pathExists("content/public/images/favicon", (err, exists) => {
          if (exists) {
            fs.emptyDir("content/public/images/favicon").then(stuff => {
              newMedia.mv("content/public" + path, err => {
                if (err) {
                  addErrorEvent(err, "favicon move error");
                }
              });
              req.app.locals.favicon = path;
              res.redirect("back");
            });
          } else {
            fs.ensureDir("content/public/images/favicon", err => {
              if (err) {
                addErrorEvent(err, "favicon create error");
              }
              newMedia.mv("content/public" + path, err => {
                if (err) {
                  addErrorEvent(err, "favicon move error");
                }
              });
              req.app.locals.favicon = path;
              res.redirect("back");
            });
          }
        });
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of favicon function */,
  brand(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let newMedia = req.files.image;
        let path = "/images/brand/" + req.files.image.name;
        config.updateItem("brand", "system", path);
        fs.pathExists("content/public/images/brand", (err, exists) => {
          if (exists) {
            fs.emptyDir("content/public/images/brand").then(stuff => {
              if (err) {
                addErrorEvent(err, "brand create error");
              }
              newMedia.mv("content/public" + path, err => {
                if (err) {
                  addErrorEvent(err, "brand move error");
                }
              });
              req.app.locals.brand = path;
              res.redirect("back");
            });
          } else {
            fs.ensureDir("content/public/images/brand", err => {
              if (err) {
                addErrorEvent(err, "brand create error");
              }
              newMedia.mv("content/public" + path, err => {
                if (err) {
                  addErrorEvent(err, "brand move error");
                }
              });
              req.app.locals.brand = path;
              res.redirect("back");
            });
          }
        });
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of favicon function */,
  cancel(req, res, next) {
    res.redirect("/admin");
  } /* end of cancel function */
};
