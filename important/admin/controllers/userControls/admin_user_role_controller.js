const passport = require("passport");
const bcrypt = require("bcryptjs");
const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* User Role model Queries */
const FindAllTheRoles = require("../../adminModels/queries/user/roles/FindAllUsers");
const FindRoleWithParam = require("../../adminModels/queries/user/roles/FindUserWithParam");
const CreateRole = require("../../adminModels/queries/user/roles/CreateUser");
const FindOneRoleByID = require("../../adminModels/queries/user/roles/FindOneUserWithID");
const EditRole = require("../../adminModels/queries/user/roles/EditUser");
const DeleteRole = require("../../adminModels/queries/user/roles/DeleteUser");
/* User Models */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
const FindAdminUserByID = require("../../adminModels/queries/user/FindAdminUserByID");

module.exports = {
  index(req, res, next) {
    Promise.all([
      FindAllTheRoles(),
      FindAdminUserByID(req.session.passport.user)
    ]).then(result => {
      res.render("../../../important/admin/views/users/user_roles.ejs", {
        roles: result[0],
        theUser: result[1]
      });
    });
  } /* end of role index function */,
  /* this one needs work?? */
  addIndex(req, res, next) {
    let name = "";
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render("../../../important/admin/views/users/add_user_role", {
        content: "",
        name: name,
        theUser: user
      });
    });
  } /* end of add index function */,
  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let name = req.body.name;
        let canRead = req.body.canRead;
        let canEdit = req.body.canEdit;
        let canWrite = req.body.canWrite;
        let canRemove = req.body.canDelete;
        let allThethings;
        if (
          canRead === "yes" &&
          canEdit === "yes" &&
          canWrite === "yes" &&
          canRemove === "yes"
        ) {
          allThethings = "yes";
        } else {
          allThethings = "no";
        }
        CreateRole({
          name: name,
          canRead: canRead,
          canWrite: canWrite,
          canEdit: canEdit,
          canRemove: canRemove,
          allThethings: allThethings
        });
        req.flash("success_msg", "Admin Role Created!");
        res.redirect("/admin/user-controls/admin-roles");
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindOneRoleByID(req.params.id),
      FindAdminUserByID(req.session.passport.user)
    ]).then(result => {
      res.render("../../../important/admin/views/users/edit_user_role", {
        content: "",
        role: result[0],
        name: result[0].name,
        id: result[0]._id,
        theUser: result[1]
      });
    });
  } /* end of edit index function */,

  saveEdit(req, res, next) {
    // still needs work
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        req.flash("success_msg", "You are now registered!");
        res.redirect("/admin/user-controls");
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of save edit function */,
  remove(req, res, next) {
    DeleteRole(req.params.id);
    req.flash("success_msg", "Admin role removed!");
    res.redirect("/admin/user-controls/admin-roles");
  } /* end of remove function */
};
