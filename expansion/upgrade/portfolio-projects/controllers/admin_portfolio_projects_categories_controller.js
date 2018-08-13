const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* media model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* media categories Queries */
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");
/* Project Category model Queries */
const CountProjectCategories = require("../models/queries/projectCategory/CountProjectCategories");
const FindAllProjectCategories = require("../models/queries/projectCategory/FindAllProjectCategories");
const CreateProjectCategory = require("../models/queries/projectCategory/CreateProjectCategory");
const EditProjectCategory = require("../models/queries/projectCategory/EditProjectCategory");
const DeleteProjectCategory = require("../models/queries/projectCategory/DeleteProjectCategory");
const FindProjectCategoryWithParams = require("../models/queries/projectCategory/FindProjectCategoryWithParams");
const FindProjectCategoryByID = require("../models/queries/projectCategory/FindOneProjectByID");
const FindAllSortedProjectCategories = require("../models/queries/projectCategory/FindAllSortedProjectCategories");
const SortProjectCategories = require("../models/queries/projectCategory/SortProjectByID");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    const CountedProjectCategories = CountProjectCategories();
    CountedProjectCategories.then(count => {
      if (count < 1) {
        const categoryProps = {
          title: "General",
          slug: "general",
          author: "",
          description: "",
          keywords: "",
          imagePath: ""
        };
        CreateProjectCategory(categoryProps);
      }
      const SortedCategories = FindAllSortedProjectCategories();
      SortedCategories.then(categories => {
        res.render(
          "../../../expansion/upgrade/portfolio-projects/views/categories/project_categories",
          {
            categories: categories,
            count: count
          }
        );
      });
    });
  } /* end of index function */,

  addIndex(req, res, next) {
    let title,
      author,
      description,
      keywords = "";
    const AllMedia = FindAllMedia();
    AllMedia.then(media => {
      res.render(
        "../../../expansion/upgrade/portfolio-projects/views/categories/add_project_category",
        {
          title: title,
          author: author,
          description: description,
          keywords: keywords,
          media: media
        }
      );
    });
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/s+/g, "-").toLowerCase();
        let author = req.body.author;
        let description = req.body.description;
        let keywords = req.body.keywords;

        if (errors.length > 0) {
          FindAllMedia().then(media => {
            return res.render(
              "../../../expansion/upgrade/portfolio-projects/views/categories/add_project_category",
              {
                errors: errors,
                title: title,
                author: author,
                description: description,
                keywords: keywords,
                media: media
              }
            );
          });
        } else {
          const CheckIfExists = FindProjectCategoryWithParams({ slug: slug });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              FindAllMedia().then(media => {
                return res.render(
                  "../../../expansion/upgrade/portfolio-projects/views/categories/add_project_category",
                  {
                    title: title,
                    author: author,
                    description: description,
                    keywords: keywords,
                    media: media
                  }
                );
              });
            } else {
              const CategoryProps = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords,
                sorting: 0
              };
              CreateProjectCategory(CategoryProps);
              req.flash("success_msg", "Project Category Added!");
              res.redirect("/admin/portfolio-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    const ProjectCategory = FindProjectCategoryByID(req.params.id);
    const AllMedia = FindAllMedia();
    Promise.all([ProjectCategory, AllMedia]).then(result => {
      res.render(
        "../../../expansion/upgrade/portfolio-projects/views/categories/edit_project_category",
        {
          title: result[0].title,
          id: result[0]._id,
          author: result[0].author,
          description: result[0].description,
          keywords: result[0].keywords,
          media: result[1]
        }
      );
    });
  } /* end of edit index function */,

  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/s+/g, "-").toLowerCase();
        let id = req.params.id;
        let author = req.body.author;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let imagepath = req.body.imagepath;

        if (errors.length > 0) {
          return res.render(
            "../../../expansion/upgrade/portfolio-projects/views/categories/edit_project_category",
            {
              errors: errors,
              title: title,
              id: id,
              author: author,
              description: description,
              keywords: keywords
            }
          );
        } else {
          const CheckIfExists = FindProjectCategoryWithParams({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(category => {
            if (category.length > 0) {
             errors.push({text: "Category title exists, chooser another."});
              return res.render(
                "../../../expansion/upgrade/portfolio-projects/views/categories/edit_project_category",
                {
                  errors: errors,
                  title: title,
                  id: id,
                  author: author,
                  description: description,
                  keywords: keywords
                }
              );
            } else {
              const categoryProps = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords,
                imagepath: imagepath
              };
              EditProjectCategory(id, categoryProps);
              req.flash("success_msg", "Project Category Edited!");
              res.redirect("/admin/portfolio-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  delete(req, res, next) {
    DeleteProjectCategory(req.params.id);
    req.flash("success_msg", "Project Category Deleted!");
    res.redirect("/admin/portfolio-categories");
  } /* end of delete function */,
  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortProjectCategories(ids);
        /* look into this more */
        //   req.app.locals.pages = sortedRes;
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */
};

