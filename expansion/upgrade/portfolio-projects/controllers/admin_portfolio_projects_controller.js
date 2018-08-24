const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
const fs = require("fs-extra");
const resizeImg = require("resize-img");
// Project model Queries
const CountProjects = require("../models/queries/project/CountProjects");
const FindAllProjects = require("../models/queries/project/FindAllProjects");
const FindProjectWithParams = require("../models/queries/project/FindProjectWithParams");
const FindOneProjectByID = require("../models/queries/project/FindOneProjectByID");
const CreateProject = require("../models/queries/project/CreateProject");
const EditProject = require("../models/queries/project/EditProject");
const DeleteProject = require("../models/queries/project/DeleteProject");
const FindAllSortedProjects = require("../models/queries/project/FindAllSortedProjects");
const FindAllSortedProjectsWithParam = require("../models/queries/project/FindSortedProjectsWithParams");
const SortProjectsByID = require("../models/queries/project/SortProjectByID");
/* media model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* media categories Queries */
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");
/* Project Category model Queries */
const FindAllProjectCategories = require("../models/queries/projectCategory/FindAllProjectCategories");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    const theCount = CountProjects();
    const allSorted = FindAllSortedProjects();
    const allCategories = FindAllProjectCategories();
    Promise.all([theCount, allSorted, allCategories]).then(result => {
      res.render(
        "../../../expansion/upgrade/portfolio-projects/views/projects",
        {
          count: result[0],
          projects: result[1],
          categories: result[2]
        }
      );
    });
  } /* end of index function */,
  catIndex(req, res, next) {
    const theCount = CountProjects();
    const sortedCat = FindAllSortedProjectsWithParam({
      category: req.params.category
    });
    const allCategories = FindAllProjectCategories();
    Promise.all([theCount, sortedCat, allCategories]).then(result => {
      res.render(
        "../../../expansion/upgrade/portfolio-projects/views/projects",
        {
          count: result[0],
          projects: result[1],
          categories: result[2]
        }
      );
    });
  } /* end of cat index function*/,

  addIndex(req, res, next) {
    let title,
      content,
      price,
      keywords,
      description,
      author,
      startedOn,
      finished = "";
    const AllProjectCategories = FindAllProjectCategories();
    const AllMedia = FindAllMedia();
    Promise.all([AllProjectCategories, AllMedia]).then(result => {
      res.render(
        "../../../expansion/upgrade/portfolio-projects/views/add_project",
        {
          title: title,
          content: content,
          categories: result[0],
          price: price,
          media: result[1],
          description: description,
          keywords: keywords,
          author: author,
          startedOn: startedOn,
          finished: finished
        }
      );
    });
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let imageFile =
          typeof req.files.image !== "undefined" ? req.files.image.name : "";
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }
        if (!imageFile) {
          errors.push({ text: "You must upload an image." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let category = req.body.category;
        let keywords = req.body.keywords;
        let description = req.body.description;
        let author = req.session.passport.user;
       
        let startedOn = req.body.startedOn;
        let finished = req.body.finished; 
        if(finished === ""){
          finished = "Current"
        }
        if (errors.length > 0) {
          const AllProjectCategories = FindAllProjectCategories();
          const AllMedia = FindAllMedia();
          Promise.all([AllProjectCategories, AllMedia]).then(result => {
            res.render(
              "../../../expansion/upgrade/portfolio-projects/views/add_project",
              {
                errors: errors,
                title: title,
                content: content,
                categories: result[0],
                media: result[1],
                description: description,
                keywords: keywords,
                author: author,
                startedOn: startedOn,
                finished: finished
              }
            );
          });
        } else {
          const CheckIfExists = FindProjectWithParams({ slug: slug });
          CheckIfExists.then(project => {
            if (project.length > 0) {
              errors.push({ text: "Project title exists, chooser another." });
              const AllProjectCategories = FindAllProjectCategories();
              const AllMedia = FindAllMedia();
              Promise.all([AllProjectCategories, AllMedia]).then(result => {
                res.render(
                  "../../../expansion/upgrade/portfolio-projects/views/add_project",
                  {
                    errors: errors,
                    title: "",
                    content: content,
                    categories: result[0],
                    media: result[1],
                    description: description,
                    keywords: keywords,
                    author: author,
                    image: imageFile,
                    startedOn: startedOn,
                    finished: finished
                  }
                );
              });
            } else {
              const ProjectProps = {
                title: title,
                slug: slug,
                content: content,
                category: category,
                image: imageFile,
                description: description,
                keywords: keywords,
                sorting: 0,
                author: author,
                started: startedOn,
                completed: finished
              };
              CreateProject(ProjectProps).then(project => {
                fs.ensureDirSync(
                  "content/public/images/portfolio_images/" + project._id,
                  function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );
                fs.ensureDirSync(
                  "content/public/images/portfolio_images/" +
                    project._id +
                    "/gallery",
                  function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );
                fs.ensureDirSync(
                  "content/public/images/portfolio_images/" +
                    project._id +
                    "/gallery/thumbs",
                  function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );

                if (imageFile !== "") {
                  let projectImage = req.files.image;
                  let path =
                    "content/public/images/portfolio_images/" +
                    project._id +
                    "/" +
                    imageFile;
                  projectImage.mv(path, function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  });
                }
              });
            }
            req.flash("success_msg", "Project added!");
            res.redirect("/admin/portfolio");
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    const AllProjectCategories = FindAllProjectCategories();
    const FoundProject = FindOneProjectByID(req.params.id);
    const AllMedia = FindAllMedia();
    Promise.all([AllProjectCategories, FoundProject, AllMedia]).then(result => {
      let galleryDir =
        "content/public/images/portfolio_images/" + result[1]._id + "/gallery";
      let galleryImages = null;

      fs.readdir(galleryDir, (err, files) => {
        if (err) {
          errorAddEvent(err);
        } else {
          galleryImages = files;
          res.render(
            "../../../expansion/upgrade/portfolio-projects/views/edit_project",
            {
              title: result[1].title,
              content: result[1].content,
              categories: result[0],
              selectedCat: result[1].category.slug,
              image: result[1].image,
              galleryImages: galleryImages,
              id: result[1]._id,
              media: result[2],
              description: result[1].description,
              keywords: result[1].keywords,
              startedOn: result[1].started,
              finished: result[1].completed
            }
          );
        }
      });
    });
  } /* end of edit index function */,

  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let imageFile =
          typeof req.files.image !== "undefined" ? req.files.image.name : "";

        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }
        // if (!imageFile) {
        //   errors.push({ text: "You must upload an image." });
        // }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let category = req.body.category;
        let pimage = req.body.pimage;
        let id = req.params.id;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let startedOn = req.body.startedOn;
        let finished = req.body.finished; 
        if(finished === ""){
          finished = "Current"
        }

        if (errors.length > 0) {
          req.flash("error_msg", "Stuff is wrong, fix stuffs.");
          res.redirect("/admin/portfolio/edit-project/" + id);
        } else {
          const CheckIfExists = FindProjectWithParams({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(project => {
            if (project.length > 0) {
              req.flash("error_msg", "Project title exists, choose another.");
              res.redirect("/admin/portfolio/edit-project/" + id);
            } else {
              if (imageFile !== "") {
                pimage = imageFile;
              }
              const ProjectParams = {
                title: title,
                slug: slug,
                content: content,
                category: category,
                description: description,
                keywords: keywords,
                image: pimage,
                started: startedOn,
                completed: finished
              };
              EditProject(id, ProjectParams).then(stuff => {
                if (imageFile !== "") {
                  if (pimage !== "") {
                    fs.remove(
                      "content/public/images/portfolio_images/" +
                        id +
                        "/" +
                        pimage,
                      function(err) {
                        if (err) {
                          errorAddEvent(err);
                        }
                      }
                    );
                  }

                  let projectImage = req.files.image;
                  let path =
                    "content/public/images/portfolio_images/" +
                    id +
                    "/" +
                    imageFile;

                  projectImage.mv(path, function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  });
                }

                req.flash("success_msg", "Project updated!");
                res.redirect("/admin/portfolio");
              });
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,

  createGallery(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let productImage = req.files.file;
        let id = req.params.id;
        let path =
          "content/public/images/product_images/" +
          id +
          "/gallery/" +
          req.files.file.name;
        let thumbsPath =
          "content/public/images/product_images/" +
          id +
          "/gallery/thumbs/" +
          req.files.file.name;

        productImage.mv(path, function(err) {
          if (err) {
            errorAddEvent(err);
          }

          resizeImg(fs.readFileSync(path), { width: 100, height: 100 }).then(
            function(buf) {
              fs.writeFileSync(thumbsPath, buf);
            }
          );
        });
        res.sendStatus(200);
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create gallery function */,
  deleteImage(req, res, next) {
    let originalImage =
      "content/public/images/product_images/" +
      req.query.id +
      "/gallery/" +
      req.params.image;
    let thumbsImage =
      "content/public/images/product_images/" +
      req.query.id +
      "/gallery/thumbs/" +
      req.params.image;

    fs.remove(originalImage, err => {
      if (err) {
        errorAddEvent(err);
      } else {
        fs.remove(thumbsImage, err => {
          if (err) {
            errorAddEvent(err);
          } else {
            req.flash("success_msg", "Image deleted!");
            res.redirect("/admin/portfolio/edit-project/" + req.query.id);
          }
        });
      }
    });
  },
  deleteProject(req, res, next) {
    let id = req.params.id;
    let path = "content/public/images/portfolio_images/" + id;

    fs.remove(path, err => {
      if (err) {
        errorAddEvent(err);
      } else {
        DeleteProject(id);
        req.flash("success_msg", "Product deleted!");
        res.redirect("/admin/portfolio");
      }
    });
  } /* end of delete project */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortProjectsByID(ids);
      } else {
        res.redirect("/users/login");
      }
    });
  }
};
