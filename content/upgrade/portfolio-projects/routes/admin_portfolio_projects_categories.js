const express = require("express")
const router = express.Router();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const auth = require("../../../../includes/config/auth")
const isAdmin = auth.isAdmin;

// GET Project model
const Project = require("../models/project")
//GET media model
const Media = require("../../../../includes/models/media")
// GET media categories
const MediaCategory = require("../../../../includes/models/mediaCategory")
// GET Project Category model
const Category = require("../models/projectCategory")
// GET User model
const User = require("../../../../includes/models/user")

/*
* GET portfolio category index
*/
router.get("/", isAdmin, function (req, res) {
    let count;

    Category.count(function (err, c) {
        count = c;
        if (count < 1) {
            Category.findOne({ title: "General" }, function (err, categories) {
                if (!categories) {
                    let category = new Category({
                        title: "General",
                        slug: "general",
                        author: "",
                        description: "",
                        keywords: "",
                        imagePath: ""
                    });
                    category.save(function (err) {
                        if (err) { return console.log(err) };
                        Category.find(function (err, categories) {
                            if (err) {
                                console.log(err)
                            } else {
                                req.app.locals.productcategories = categories;
                            }
                        })
                    })
                }
            })
        }
        Category.find(function (err, categories) {
            if (err) {
                return console.log(err)
            } else {
                res.render("../../upgrade/portfolio-projects/views/categories/project_categories", {
                    categories: categories,
                    count: count
                })
            }
        })
    })
})
/*
* GET add portfolio category
*/
router.get("/add-portfolio-category", isAdmin, function (req, res) {
    let title = "";
    let author = "";
    let description = "";
    let keywords = "";
    let imagePath = "";
    Media.find({}, function (err, media) {
        res.render("../../upgrade/portfolio-projects/views/categories/add_project_category", {
            title: title,
            author: author,
            description: description,
            keywords: keywords,
            imagePath: imagePath,
            media: media
        })
    })
})

/*
* POST add portfolio category
*/
router.post("/add-portfolio-category", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            req.checkBody("title", "Title must have a value.").notEmpty();

            let title = req.body.title;
            let slug = title.replace(/\s+/g, "-").toLowerCase();
            let errors = req.validationErrors();
            let author = req.body.author;
            let description = req.body.description;
            let keywords = req.body.keywords;
            let imagePath = req.body.imagepath

            if (errors) {
                return res.render("../../upgrade/portfolio-projects/views/categories/add_project_category", {
                    errors: errors,
                    title: title,
                    author: author,
                    description: description,
                    keywords: keywords
                })
            } else {
                Category.findOne({ slug: slug }, function (err, category) {
                    if (category) {
                        req.flash("danger", "Category title exists, choose another.")
                        return res.render("../../upgrade/portfolio-projects/views/categories/add_project_category", {
                            title: title,
                            author: author,
                            description: description,
                            keywords: keywords
                        });
                    } else {
                        let category = new Category({
                            title: title,
                            slug: slug,
                            author: author,
                            description: description,
                            keywords: keywords
                        });
                        category.save(function (err) {
                            if (err) { return console.log(err) };
                            Category.find(function (err, categories) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    req.app.locals.portfoliocategories = categories;
                                }
                            })
                            req.flash("success", "Page added!");
                            res.redirect("/admin/portfolio-categories");
                        })
                    }
                })
            }
        } else {
            res.redirect("/users/login");
        }
    })
})

/*
* GET edit portfolio category
*/
router.get("/edit-portfolio-category/:id", isAdmin, function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) {
            return console.log(err)
        } else {
            Media.find({}, function (err, media) {
                res.render("../../upgrade/portfolio-projects/views/categories/edit_project_category", {
                    title: category.title,
                    id: category._id,
                    author: category.author,
                    description: category.description,
                    keywords: category.keywords,
                    media: media
                })
            })
        }
    })
})

/*
* POST edit portfolio category
*/
router.post("/edit-portfolio-category/:id", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            req.checkBody("title", "Title must have a value.").notEmpty();

            let title = req.body.title;
            let slug = title.replace(/\s+/g, "-").toLowerCase();
            let id = req.params.id;

            let author = req.body.author;
            let description = req.body.description;
            let keywords = req.body.keywords;
            let imagepath = req.body.imagepath;
            let errors = req.validationErrors();

            if (errors) {
                return res.render("../../upgrade/portfolio-projects/views/categories/edit_project_category", {
                    errors: errors,
                    title: title,
                    id: id,
                    author: author,
                    description: description,
                    keywords: keywords
                })
            } else {

                Category.findOne({ slug: slug, _id: { '$ne': id } }, function (err, category) {
                    if (category) {
                        req.flash("danger", "Category title exists, chooser another.")
                        return res.render("../../upgrade/portfolio-projects/views/categories/edit_project_category", {
                            title: title,
                            id: id,
                            author: author,
                            description: description,
                            keywords: keywords
                        });
                    } else {
                        Category.findById(id, function (err, category) {
                            if (err) {
                                return console.log(err);
                            }
                            category.title = title;
                            category.slug = slug;
                            category.author = author;
                            category.description = description;
                            category.keywords = keywords;
                            category.imagepath = imagepath

                            category.save(function (err) {
                                if (err) { return console.log(err) };
                                Category.find(function (err, categories) {
                                    if (err) {
                                        console.log(err)
                                    } else {
                                        req.app.locals.productcategories = categories;
                                    }
                                })
                                req.flash("success", "Page added!");
                                res.redirect("/admin/portfolio-categories");
                            })

                        })

                    }
                })
            }
        } else {
            res.redirect("/users/login");
        }
    })
})

/*
* GET delete portfolio category
*/
router.get("/delete-portfolio-category/:id", isAdmin, function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return console.log(err)
        }

        Category.find(function (err, categories) {
            if (err) {
                console.log(err)
            } else {
                req.app.locals.productcategories = categories;
            }
        })
        req.flash("success", "Category deleted!")
        res.redirect("/admin/portfolio-categories")

    })
})

//Exports
module.exports = router;