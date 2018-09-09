const fs = require("fs-extra");
const express = require("express");
const router = express.Router();
const config = require("../../../important/AppStuff/config/stuff.json");

// GET page model
const FindPageWithParams = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
const createPage = require("../../../important/admin/adminModels/queries/page/CreatePage");
// GET media model
const FindAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");
//GET project categories
const FindAllPortfolioCategories = require("../../../expansion/upgrade/portfolio-projects/models/queries/projectCategory/FindAllProjectCategories");
const FindPortfolioCategoryWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/projectCategory/FindProjectCategoryWithParams");
//GET portfolio projects
const FindProjectWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindProjectWithParams");
const FindMostRecentProject = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindMostRecentProjectSorted");
const FindSortedProjects = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindAllSortedProjects");
const FindSortedProjectsWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindSortedProjectsWithParams");

const pagesController = require("../controllers/pages_controller");
/*
* GET /contact
*/
router.get("/contact", pagesController.contact);
/*
* GET /portfolio
*/
router.get("/portfolio", pagesController.portfolioAll);
/*
* GET /portfolio/:category
*/
router.get("/portfolio/:category", function(req, res) {
  const id = req.params.category;
  const AllPortfolioCategories = FindAllPortfolioCategories();
  const foundCategories = FindPortfolioCategoryWithParams({ _id: id });
  const foundProjects = FindSortedProjectsWithParams({ category: id });
  const AllMedia = FindAllMedia();
  Promise.all([
    AllPortfolioCategories,
    foundCategories,
    foundProjects,
    AllMedia
  ]).then(result => {
    res.render("pages/portfolio_cats", {
      title: result[1][0].title,
      keywords: result[1][0].keywords,
      description: result[1][0].description,
      author: "",
      media: result[3],
      portfolioCats: result[0],
      projects: result[2]
    });
  });
});
/*
* GET /portfolio/:category
*/
router.get("/portfolio/:category/:project", function(req, res) {
  const slug = req.params.category;
  const project = req.params.project;
  const AllPortfolioCategories = FindAllPortfolioCategories();
  const foundProject = FindProjectWithParams({ _id: project });
  const AllMedia = FindAllMedia();

  let galleryImages = null;
  Promise.all([AllPortfolioCategories, foundProject, AllMedia]).then(result => {
    let galleryDir =
      "content/public/images/portfolio_images/" + result[1][0]._id + "/gallery";

    fs.readdir(galleryDir, function(err, files) {
      if (err) {
        console.log(err);
      } else {
        galleryImages = files;

        res.render("pages/portfolioProject", {
          title: result[1][0].title,
          keywords: result[1][0].keywords,
          description: result[1][0].description,
          content: result[1][0].content,
          author: "",
          media: result[2],
          portfolioCats: result[0],
          project: result[1][0],
          galleryImages: galleryImages
        });
      }
    });
  });
});

/*
* GET /about
*/
router.get("/about", function(req, res) {
  const AllMedia = FindAllMedia();
  const foundPage = FindPageWithParams({ slug: "about" });
  Promise.all([AllMedia, foundPage]).then(result => {
    res.render("pages/about", {
      title: result[1][0].title,
      content: result[1][0].content,
      keywords: result[1][0].keywords,
      description: result[1][0].description,
      author: result[1][0].author,
      siKey: config.recaptchasitekey,
      media: result[0]
    });
  });
});

/*
* GET /
*/

router.get("/", function(req, res) {
  const foundPage = FindPageWithParams({ slug: "home" });
  foundPage.then(page => {
    if (page.length < 1) {
      let pageProps = {
        title: "Home",
        slug: "home",
        content: "You should put stuff here and stuff.",
        parent: "home",
        description: "",
        keywords: "",
        author: ""
      };
      const AllMedia = FindAllMedia();
      const makePage = createPage(pageProps);
      Promise.all([AllMedia, makePage]).then(result => {
        res.render("index", {
          title: result[1][0].title,
          content: result[1][0].content,
          keywords: result[1][0].keywords,
          description: result[1][0].description,
          author: result[1][0].author,
          media: result[0]
        });
      });
    } else {
      let pubsName;
      FindAllPortfolioCategories().then(cats => {
        cats.forEach(cat => {
          if (cat.slug === "publications") {
            pubsName = cat._id;
          }
        });
        const AllMedia = FindAllMedia();
        const recentProject = FindMostRecentProject();
        const foundProjects = FindProjectWithParams({ category: pubsName });
        Promise.all([AllMedia, recentProject, foundProjects]).then(result => {
          res.render("index", {
            title: page[0].title,
            content: page[0].content,
            keywords: page[0].keywords,
            description: page[0].description,
            author: page[0].author,
            media: result[0],
            project: result[1],
            books: result[2]
          });
        });
      });
    }
  });
});

/*
* GET a page
*/

router.get("/:slug", function(req, res) {
  let slug = req.params.slug;
  const AllMedia = FindAllMedia();
  const foundPage = FindPageWithParams({ slug: slug });
  Promise.all([AllMedia, foundPage]).then(result => {
    if (result[1].length < 1) {
      res.redirect("/");
    } else {
      res.render("index", {
        title: result[1].title,
        content: result[1].content,
        keywords: result[1].keywords,
        description: result[1].description,
        author: result[1].author,
        media: result[0]
      });
    }
  });
});

//Exports
module.exports = router;
