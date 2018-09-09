const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* Blog Category Model Queries */
const CountBlogCategories = require("../models/queries/blogCategory/CountBlogCategory");
const FindAllBlogCategories = require("../models/queries/blogCategory/FindAllBlogCategory");
const FindBlogCategoryWithParam = require("../models/queries/blogCategory/FindBlogCategoryWithParam");
const CreateBlogCategory = require("../models/queries/blogCategory/CreateBlogCategory");
const FindOneBlogCategoryByID = require("../models/queries/blogCategory/FindOneBlogCategoryByID");
const EditBlogCategory = require("../models/queries/blogCategory/EditBlogCategory");
const DeleteBlogCategory = require("../models/queries/blogCategory/DeleteBlogCategory");
const FindAllSortedBlogCategories = require("../models/queries/blogCategory/FindAllSortedBlogCategories");
const SortBlogCategories = require("../models/queries/blogCategory/SortBlogCategoriesByID");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
const FindOneAdminByID = require("../../../../important/admin/adminModels/queries/user/FindAdminUserByID");
module.exports = {
  index(req, res, next) {
    CountBlogCategories().then(count => {
      if (count === 0) {
        const GeneralParams = {
          title: "General",
          slug: "general",
          author: "",
          description: "",
          keywords: ""
        };
        CreateBlogCategory(GeneralParams);
      }
      Promise.all([
        FindAllSortedBlogCategories(),
        FindOneAdminByID(req.session.passport.user)
      ]).then(result => {
        res.render(
          "../../../expansion/upgrade/blog/views/categories/blog_categories",
          {
            categories: result[0],
            count: count,
            theUser: result[1]
          }
        );
      });
    });
  } /* end of index function */,

  addIndex(req, res, index) {
    let title,
      author,
      description,
      keywords = "";
    FindOneAdminByID(req.session.passport.user).then(user => {
      res.render(
        "../../../expansion/upgrade/blog/views/categories/add_blog_category",
        {
          title: title,
          description: description,
          author: author,
          keywords: keywords,
          theUser: user
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
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let description = req.body.description;
        let author = req.body.author;
        let keywords = req.body.keywords;
        if (errors.length > 0) {
          return res.render(
            "../../../expansion/upgrade/blog/views/categories/add_blog_category",
            {
              errors: errors,
              title: title,
              description: description,
              author: author,
              keywords: keywords
            }
          );
        } else {
          const CheckIfExists = FindBlogCategoryWithParam({ slug: slug });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              return res.render(
                "../../../expansion/upgrade/blog/views/categories/add_blog_category",
                {
                  errors: errors,
                  title: title,
                  description: description,
                  author: author,
                  keywords: keywords
                }
              );
            } else {
              const CategoryParams = {
                title: title,
                slug: slug,
                description: description,
                author: author,
                keywords: keywords
              };
              CreateBlogCategory(CategoryParams);
              req.flash("success_msg", "Blog Category Added!");
              res.redirect("/admin/blog-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindOneBlogCategoryByID(req.params.id),
      FindOneAdminByID(req.session.passport.user)
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/blog/views/categories/edit_blog_category",
        {
          title: result[0].title,
          id: result[0]._id,
          author: result[0].author,
          description: result[0].description,
          keywords: result[0].keywords,
          theUser: result[1]
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
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let id = req.params.id;

        let author = req.body.author;
        let description = req.body.description;
        let keywords = req.body.keywords;

        if (errors.length > 0) {
          return res.render(
            "../../../expansion/upgrade/blog/views/categories/edit_blog_category",
            {
              errors: errors,
              title: title,
              id: id,
              description: description,
              author: author,
              keywords: keywords
            }
          );
        } else {
          const CheckIfExists = FindBlogCategoryWithParam({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, chooser another." });
              return res.render(
                "../../../expansion/upgrade/blog/views/categories/edit_blog_category",
                {
                  errors: errors,
                  title: title,
                  id: id,
                  description: description,
                  author: author,
                  keywords: keywords
                }
              );
            } else {
              const BlogCategoryParams = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords
              };
              EditBlogCategory(id, BlogCategoryParams);
              req.flash("success_msg", "Blog Category Edited!");
              res.redirect("/admin/blog-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,

  delete(req, res, next) {
    DeleteBlogCategory(req.params.id);
    req.flash("success_msg", "Blog Category Deleted!");
    res.redirect("/admin/blog-categories");
  } /* end of delete function */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortBlogCategories(ids);
        /* look into this more */
        //   req.app.locals.pages = sortedRes;
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */
};