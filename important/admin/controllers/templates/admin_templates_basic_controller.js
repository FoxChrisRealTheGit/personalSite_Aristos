const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* Media model queries */
const FindAllMedia = require("../../adminModels/queries/media/FindAllMedia");
/* User Model Queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
const FindAdminUserByID = require("../../adminModels/queries/user/FindAdminUserByID");
/* Template Model Queries */
const CountTemplayes = require("../../adminModels/queries/templates/CountTemplates");
const FindAllTemplates = require("../../adminModels/queries/templates/FindAllTemplates");
const CreateTemplate = require("../../adminModels/queries/templates/CreateTemplate");
const FindTemplateWithParam = require("../../adminModels/queries/templates/FindTemplateWithParam");
const FindOneTemplate = require("../../adminModels/queries/templates/FindOneTemplatebyID");
const EditTemplate = require("../../adminModels/queries/templates/EditTemplate");
const DeleteTemplate = require("../../adminModels/queries/templates/DeleteTemplate");

module.exports = {
  index(req, res, next) {
    Promise.all([
      FindAllTemplates(),
      CountTemplayes(),
      FindAdminUserByID(req.session.passport.user)
    ]).then(result => {
      res.render(
        "../../../important/admin/views/templateBuilder/templateDashboard",
        {
          templates: result[0],
          count: result[1],
          theUser: result[2]
        }
      );
    });
  } /* end of template index function */,

  addIndex(req, res, next) {
    FindAdminUserByID(req.session.passport.user).then(user => {
      res.render(
        "../../../important/admin/views/templateBuilder/addBasicTemplate",
        {
          content: "",
          title: "",
          description: "",
          path: "",
          theUser: user
        }
      );
    });
  } /* end of template add index function */,

  basicCreate(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.path) {
          errors.push({ text: "Please add a path." });
        }

        let title = req.body.title;
        let content = req.body.content;
        let viewPath = req.body.path;
        let description = req.body.description;
        let author = req.session.passport.user;

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/templateBuilder/addBasicTemplate",
            {
              errors: errors,
              title: title,
              path: viewPath,
              content: content,
              description: description
            }
          );
        } else {
          CreateTemplate({
            title: title,
            path: viewPath,
            content: content,
            author: author,
            description: description
          }).then(() => {
            FindAllTemplates().then(templates => {
              req.flash("success_msg", "Template added!");
              res.redirect("/admin/template-builder");
            });
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of template basic create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindOneTemplate(req.params.id),
      FindAdminUserByID(req.session.passport.user)
    ]).then(result => {
      res.render(
        "../../../important/admin/views/templateBuilder/editBasicTemplate",
        {
          content: result[0].content,
          title: result[0].title,
          path: result[0].path,
          description: result[0].description,
          id: result[0]._id,
          theUser: result[1]
        }
      );
    });
  } /* end of edit index function */,

  basicUpdate(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.path) {
          errors.push({ text: "Please add a path." });
        }

        let title = req.body.title;
        let content = req.body.content;
        let viewPath = req.body.path;
        let description = req.body.description;
        let id = req.params.id;

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/templateBuilder/addBasicTemplate",
            {
              errors: errors,
              title: title,
              path: viewPath,
              content: content,
              description: description
            }
          );
        } else {
          const templateProps = {
            title: title,
            content: content,
            path: viewPath,
            description: description
          };
          EditTemplate(id, templateProps);
          FindAllTemplates().then(templates => {
            req.flash("success_msg", "Template updated!");
            res.redirect("/admin/template-builder");
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of basic update function */,

  basicDelete(req, res, next) {
    //remove all associated pages??
    DeleteTemplate(req.params.id).then(() => {
      FindAllTemplates().then(templates => {
        req.flash("success_msg", "Template deleted!");
        res.redirect("/admin/template-builder");
      });
    });
  } /* end of basic delete */
};
