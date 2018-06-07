const express = require("express")
const router = express.Router();
const config = require("../../../includes/config/stuff");
// GET page model
const Page = require("../../../includes/models/page")
// GET media model
const Media = require("../../../includes/models/media")
//GET project categories
const portfolioCategories = require("../../upgrade/portfolio-projects/models/projectCategory")
//GET portfolio projects
const projects = require("../../upgrade/portfolio-projects/models/project");
/*
* GET /contact
*/
router.get("/contact", function (req, res) {
    Media.find({}, function (err, media) {
        Page.findOne({ slug: "contact" }, function (err, page) {
            if (err) {
                console.log(err);
            }
            res.render("pages/contact", {
                title: page.title,
                content: page.content,
                keywords: page.keywords,
                description: page.description,
                author: page.author,
                siKey: config.recaptchasitekey,
                media: media
            })
        })

    })
})
/*
* GET /portfolio
*/
router.get("/portfolio", function (req, res) {
    Media.find({}, function (err, media) {
        portfolioCategories.find({}, function (err, portfolioCat) {
            projects.find({}).sort({ _id: -1 }).exec(function (err, project) {
                Page.findOne({ slug: "portfolio" }, function (err, page) {
                    if (err) {
                        console.log(err);
                    }
                    res.render("pages/portfolio", {
                        title: page.title,
                        keywords: page.keywords,
                        description: page.description,
                        author: page.author,
                        media: media,
                        portfolioCats: portfolioCat,
                        projects: project
                    })
                })
            })
        })
    })
})
/*
* GET /portfolio/:category
*/
router.get("/portfolio/:category", function (req, res) {
    const slug = req.params.category

    portfolioCategories.find({}, function (err, portfolioCat) {
        portfolioCategories.findOne({ slug: slug }, function (err, Cats) {
            projects.find({ category: slug }).sort({ _id: -1 }).exec(function (err, project) {
                Media.find({}, function (err, media) {
                    if (err) {
                        console.log(err);
                    }
                    res.render("pages/portfolio_cats", {
                        title: Cats.title,
                        keywords: Cats.keywords,
                        description: Cats.description,
                        author: Cats.author,
                        media: media,
                        portfolioCats: portfolioCat,
                        projects: project
                    })
                })
            })
        })
    })
})
/*
* GET /portfolio/:category
*/
router.get("/portfolio/:category/:project", function (req, res) {
    const slug = req.params.category
    const project = req.params.project

    portfolioCategories.find({}, function (err, portfolioCat) {
        projects.findOne({ _id: project }, function (err, project) {
            Media.find({}, function (err, media) {
                if (err) {
                    console.log(err);
                }
                res.render("pages/portfolioProject", {
                    title: project.title,
                    keywords: project.keywords,
                    description: project.description,
                    content: project.content,
                    author: project.author,
                    media: media,
                    portfolioCats: portfolioCat,
                    project: project
                })
            })
        })
    })
})

/*
* GET /about
*/
router.get("/about", function (req, res) {
    Media.find({}, function (err, media) {
        Page.findOne({ slug: "about" }, function (err, page) {
            if (err) {
                console.log(err);
            }
            res.render("pages/about", {
                title: page.title,
                content: page.content,
                keywords: page.keywords,
                description: page.description,
                author: page.author,
                siKey: config.recaptchasitekey,
                media: media
            })
        })
    })
})

/*
* GET /
*/

router.get("/", function (req, res) {
    Page.findOne({ slug: "home" }, function (err, page) {
        if (!page) {
            let page = new Page({
                title: "Home",
                slug: "home",
                content: "You should put stuff here and stuff.",
                parent: "home",
                description: "",
                keywords: "",
                author: ""
            });
            Media.find({}, function (err, media) {
                if (err) {
                    console.log(err);
                }
                page.save(function (err) {
                    if (err) { return console.log(err) };
                    res.render("index", {
                        title: page.title,
                        content: page.content,
                        keywords: page.keywords,
                        description: page.description,
                        author: page.author,
                        media: media
                    })
                })
            })

        } else {
            Media.find({}, function (err, media) {
                projects.find().sort({ _id: -1 }).limit(1).exec(function (err, project) {
                    projects.find({ category: "publications" }, function (err, pubsStuff) {
                        if (err) {
                            console.log(err);
                        }
                        res.render("index", {
                            title: page.title,
                            content: page.content,
                            keywords: page.keywords,
                            description: page.description,
                            author: page.author,
                            media: media,
                            project: project,
                            books: pubsStuff
                        })
                    })
                })
            })
        }

    })
})

/*
* GET a page
*/

router.get("/:slug", function (req, res) {
    let slug = req.params.slug;
    Media.find({}, function (err, media) {
        Page.findOne({ slug: slug }, function (err, page) {
            if (err) {
                console.log(err);
            }

            if (!page) {
                res.redirect("/")
            } else {
                res.render("index", {
                    title: page.title,
                    content: page.content,
                    keywords: page.keywords,
                    description: page.description,
                    author: page.author,
                    media: media
                })
            }
        })

    })
})


//Exports
module.exports = router;