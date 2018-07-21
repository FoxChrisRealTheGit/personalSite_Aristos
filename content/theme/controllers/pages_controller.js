const express = require("express");
const router = express.Router();
const config = require("../../../important/AppStuff/config/stuff.json");

// GET page model
const FindPageWithParams = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
const createPage = require("../../../important/admin/adminModels/queries/page/CreatePage");
// GET media model
const FindAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");
const FindMediaWithParams = require("../../../important/admin/adminModels/queries/media/FindAllMediaWithParam");
//GET project categories
const FindAllPortfolioCategories = require("../../../expansion/upgrade/portfolio-projects/models/queries/projectCategory/FindAllProjectCategories");
const FindPortfolioCategoryWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/projectCategory/FindProjectCategoryWithParams");
//GET portfolio projects
const FindProjectWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindProjectWithParams");
const FindMostRecentProject = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindMostRecentProjectSorted");
const FindSortedProjects = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindAllSortedProjects");
const FindSortedProjectsWithParams = require("../../../expansion/upgrade/portfolio-projects/models/queries/project/FindSortedProjectsWithParams");

module.exports={
    contact(req, res, next){
        const AllMedia = FindMediaWithParams({category: "site-logo"});
        const foundPage = FindPageWithParams({ slug: "contact" });
        Promise.all([AllMedia, foundPage]).then(result => {
          res.render("pages/contact", {
            title: result[1][0].title,
            content: result[1][0].content,
            keywords: result[1][0].keywords,
            description: result[1][0].description,
            author: result[1][0].author,
            siKey: config.recaptchasitekey,
            media: result[0]
          });
        });
    },
    portfolioAll(req, res, next){
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
            title: result[3][0].title,
            keywords: result[3][0].keywords,
            description: result[3][0].description,
            author: result[3][0].author,
            media: result[0],
            portfolioCats: result[1],
            projects: result[2]
          });
        });
    }

}