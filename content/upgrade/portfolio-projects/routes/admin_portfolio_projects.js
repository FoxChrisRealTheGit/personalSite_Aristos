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
* GET Project index
*/
router.get("/", isAdmin, function (req, res) {
    let count;

    // Project.count(function (err, c) {
    //     count = c;
    // })
    Project.find(function (err, project) {
        res.render("../../upgrade/portfolio-projects/views/projects", {
            projects: project
        })
    })

})


/*
* GET add portfolio Project
*/
router.get("/add-project", isAdmin, function (req, res) {
    let title = "";
    let content = "";
    let price = "";
    let keywords = "";
    let description = "";
    let author = ""

    Category.find(function (err, categories) {
        Media.find({}, function (err, media) {

            res.render("../../upgrade/portfolio-projects/views/add_project", {
                title: title,
                content: content,
                categories: categories,
                price: price,
                media: media,
                description: description,
                keywords: keywords,
                author: author
            })
        })
    })

})



/*
* POST add project
*/
router.post("/add-project", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            let imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

            req.checkBody("title", "Title must have a value.").notEmpty();
            req.checkBody("content", "Content must have a value.").notEmpty();
            req.checkBody("image", "You must upload an image.").isImage(imageFile);

            let title = req.body.title;
            let slug = title.replace(/\s+/g, "-").toLowerCase();
            let content = req.body.content;
            let category = req.body.category;
            let keywords = req.body.keywords;
            let description = req.body.description;
            let author = req.body.author;

            let errors = req.validationErrors();

            if (errors) {
                Category.find(function (err, categories) {
                    Media.find({}, function (err, media) {
                        res.render("../../upgrade/portfolio-projects/views/add_project", {
                            errors: errors,
                            title: title,
                            content: content,
                            categories: categories,
                            media: media,
                            description: description,
                            keywords: keywords,
                            author: author
                        })
                    })
                })
            } else {
                Project.findOne({ slug: slug }, function (err, project) {
                    if (project) {
                        req.flash("danger", "Project title exists, chooser another.")
                        Media.find({}, function (err, media) {
                            Category.find(function (err, categories) {
                                res.render("../../upgrade/portfolio-projects/views/add_project", {
                                    title: title,
                                    content: content,
                                    categories: categories,
                                    media: media,
                                    description: description,
                                    keywords: keywords,
                                    author: author
                                })
                            })
                        })
                    } else {
                        let project = new Project({
                            title: title,
                            slug: slug,
                            content: content,
                            category: category,
                            image: imageFile,
                            description: description,
                            keywords: keywords,
                            sorting: 100,
                            author: author
                        });

                        project.save(function (err) {
                            if (err) { return console.log(err) };

                            mkdirp("content/public/images/portfolio_images/" + project._id, function (err) {
                                if (err) { console.log(err) };
                            })
                            mkdirp("content/public/images/portfolio_images/" + project._id + "/gallery", function (err) {
                                if (err) { console.log(err) };
                            })
                            mkdirp("content/public/images/portfolio_images/" + project._id + "/gallery/thumbs", function (err) {
                                if (err) { console.log(err) };
                            })



                            if (imageFile !== "") {
                                let projectImage = req.files.image;
                                let path = "content/public/images/portfolio_images/" + project._id + "/" + imageFile;
                                projectImage.mv(path, function (err) {
                                    if (err) { console.log(err) };
                                })
                            }
                            if (err) {
                                console.log(err)
                            }

                        })

                    }
                    req.flash("success", "Project added!");
                    res.redirect("/admin/portfolio");
                })
            }
        } else {
            res.redirect("/users/login");
        }
    })
})
/*
* GET edit Product
*/
router.get("/edit-project/:id", isAdmin, function (req, res) {
    let errors;

    if (req.session.errors) {
        errors = req.session.errors;
    } else {
        req.session.errors = null;
    }
    Category.find(function (err, categories) {
        Project.findById(req.params.id, function (err, p) {
            if (err) {
                console.log(err)
                res.redirect("/admin/portfolio")
            } else {
                let galleryDir = "content/public/images/portfolio_images/" + p._id + "/gallery"
                let galleryImages = null;

                fs.readdir(galleryDir, function (err, files) {
                    if (err) {
                        console.log(err);
                    } else {
                        galleryImages = files

                        Media.find({}, function (err, media) {
                            res.render("../../upgrade/portfolio-projects/views/edit_project", {
                                title: p.title,
                                errors: errors,
                                content: p.content,
                                categories: categories,
                                selectedCat: p.category,
                                image: p.image,
                                galleryImages: galleryImages,
                                id: p._id,
                                media: media,
                                author: p.author,
                                description: p.description,
                                keywords: p.keywords
                            })
                        })
                    }
                })
            }
        })
    })
})

/*
* POST edit project
*/
router.post("/edit-project/:id", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            let imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";

            req.checkBody("title", "Title must have a value.").notEmpty();
            req.checkBody("content", "Content must have a value.").notEmpty();
            req.checkBody("image", "You must upload an image.").isImage(imageFile);

            let title = req.body.title;
            let slug = title.replace(/\s+/g, "-").toLowerCase();
            let content = req.body.content;
            let category = req.body.category;
            let pimage = req.body.pimage;
            let id = req.params.id;
            let description = req.body.description;
            let author = req.body.author;
            let keywords = req.body.keywords;

            let errors = req.validationErrors();

            if (errors) {
                req.session.error = errors;
                res.redirect("/admin/portfolio-projects/views/edit-project/" + id);
            } else {
                Project.findOne({ slug: slug, _id: { '$ne': id } }, function (err, p) {
                    if (err) {
                        console.log(err);
                    }

                    if (p) {
                        req.flash("danger", "Project title exists, choose another.")
                        res.redirect("/admin/portfolio-projects/views/edit-project/" + id)
                    } else {
                        Project.findById(id, function (err, p) {
                            if (err) {
                                console.log(err)
                            }

                            p.title = title;
                            p.slug = slug;
                            p.content = content;
                            p.category = category;
                            if (imageFile !== "") {
                                p.image = imageFile
                            }
                            p.description = description;
                            p.keywords = keywords;
                            p.author = author;

                            p.save(function (err) {
                                if (err) {
                                    console.log(err)
                                }

                                if (imageFile !== "") {
                                    if (pimage !== "") {
                                        fs.remove("content/public/images/portfolio_images/" + id + "/" + pimage, function (err) {
                                            if (err) {
                                                console.log(err)
                                            }
                                        })
                                    }

                                    let projectImage = req.files.image;
                                    let path = "content/public/images/portfolio_images/" + id + "/" + imageFile;

                                    projectImage.mv(path, function (err) {
                                        if (err) {
                                            console.log(err)
                                        }
                                    })
                                }

                                req.flash("success", "Project updated!");
                                res.redirect("/admin/portfolio");
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
* POST project gallery
*/
router.post("/project-gallery/:id", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            let productImage = req.files.file;
            let id = req.params.id;
            let path = "content/public/images/product_images/" + id + "/gallery/" + req.files.file.name;
            let thumbsPath = "content/public/images/product_images/" + id + "/gallery/thumbs/" + req.files.file.name;

            productImage.mv(path, function (err) {
                if (err) {
                    console.log(err);
                }

                resizeImg(fs.readFileSync(path), { width: 100, height: 100 }).then(function (buf) {
                    fs.writeFileSync(thumbsPath, buf);
                })
            })
            res.sendStatus(200);
        } else {
            res.redirect("/users/login");
        }
    })
})

/*
* GET delete image
*/
router.get("/delete-image/:image", isAdmin, function (req, res) {
    let originalImage = "content/public/images/product_images/" + req.query.id + "/gallery/" + req.params.image;
    let thumbsImage = "content/public/images/product_images/" + req.query.id + "/gallery/thumbs/" + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err)
        } else {
            fs.remove(thumbsImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success", "Image deleted!");
                    res.redirect("/admin/portfolio/edit-project/" + req.query.id)
                }
            })
        }
    })

})

/*
* GET delete Project
*/
router.get("/delete-project/:id", isAdmin, function (req, res) {

    let id = req.params.id;
    let path = "content/public/images/portfolio_images/" + id;

    fs.remove(path, function (err) {
        if (err) {
            console.log(err)
        } else {
            Project.findByIdAndRemove(id, function (err) {
                if (err) {
                    console.log(err)
                }
            })

            req.flash("success", "Product deleted!")
            res.redirect("/admin/portfolio")
        }
    })
})
// Sort product function
function sortProjects(ids, cb) {
    let count = 0;

    for (let i = 0; i < ids.length; i++) {
        let id = ids[i];
        count++;

        (function (count) {
            Product.findById(id, function (err, product) {
                product.sorting = count;
                product.save(function (err) {
                    if (err) {
                        return console.log(err)
                    }

                    ++count;
                    if (count >= ids.length) {
                        cb()

                    }
                });
            });
        })(count);
    }
}

/* 
* POST reorder projects
*/
router.post("/reorder-projects", function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            let ids = req.body["id[]"]

            sortProjects(ids, function () {
                Product.find({}).sort({ sorting: 1 }).exec(function (err, product) {
                    if (err) {
                        console.log(err);
                    }
                })
            })
        } else {
            res.redirect("/users/login");
        }
    })
})



//Exports
module.exports = router;