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
/*
* GET /contact
*/
router.get("/contact", (req, res) => {
  const AllMedia = FindAllMedia();
  const foundPage = FindPageWithParams({ slug: "contact" });
  Promise.all([AllMedia, foundPage]).then(result => {
    res.render("pages/contact", {
      title: result[1].title,
      content: result[1].content,
      keywords: result[1].keywords,
      description: result[1].description,
      author: result[1].author,
      siKey: config.recaptchasitekey,
      media: result[0]
    });
  });
});
/*
* GET /portfolio
*/
router.get("/portfolio", (req, res) => {
  const AllMedia = FindAllMedia();
  const AllPortfolioCategories = FindAllPortfolioCategories();
  const sortedProjects = FindSortedProjects();
  const foundPage = FindPageWithParams({ slug: "portfolio" });
  Promise.all([
    AllMedia,
    AllPortfolioCategories,
    sortedProjects,
    foundPage
  ]).then(result => {
    res.render("pages/portfolio", {
      title: result[3].title,
      keywords: result[3].keywords,
      description: result[3].description,
      author: result[3].author,
      media: result[0],
      portfolioCats: result[1],
      projects: result[2]
    });
  });
});
/*
* GET /portfolio/:category
*/
router.get("/portfolio/:category", function(req, res) {
  const slug = req.params.category;
  const AllPortfolioCategories = FindAllPortfolioCategories();
  const foundCategories = FindPortfolioCategoryWithParams({ slug: slug });
  const foundProjects = FindSortedProjectsWithParams({ category: slug });
  const AllMedia = FindAllMedia();
  Promise.all([
    AllPortfolioCategories,
    foundCategories,
    foundProjects,
    AllMedia
  ]).then(result => {
    res.render("pages/portfolio_cats", {
      title: result[1].title,
      keywords: result[1].keywords,
      description: result[1].description,
      author: result[1].author,
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
  Promise.all([AllPortfolioCategories, foundProject, AllMedia]).then(result => {
    res.render("pages/portfolioProject", {
      title: result[1].title,
      keywords: result[1].keywords,
      description: result[1].description,
      content: result[1].content,
      author: result[1].author,
      media: result[2],
      portfolioCats: result[0],
      project: result[1]
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
      title: result[1].title,
      content: result[1].content,
      keywords: result[1].keywords,
      description: result[1].description,
      author: result[1].author,
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
    if (!page) {
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
          title: result[1].title,
          content: result[1].content,
          keywords: result[1].keywords,
          description: result[1].description,
          author: result[1].author,
          media: result[0]
        });
      });
    } else {
      const AllMedia = FindAllMedia();
      const recentProject = FindMostRecentProject();
      const foundProjects = FindProjectWithParams({ category: "publications" });
      Promise.all([AllMedia, recentProject, foundProjects]).then(result => {
        res.render("index", {
          title: page.title,
          content: page.content,
          keywords: page.keywords,
          description: page.description,
          author: page.author,
          media: result[0],
          project: result[1],
          books: result[2]
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
    if (!result[1]) {
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
