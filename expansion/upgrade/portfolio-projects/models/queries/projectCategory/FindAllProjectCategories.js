const fs = require("fs-extra");
let ProjectCategory;
try {
  const ProjectCategories = fs.readJSONSync(
    "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
  ).route;
  ProjectCategory = require(ProjectCategories);
} catch (err) {
  ProjectCategory = require("../../projectCategory");
}

/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the proejct categories in the Project Category collection.
 * @return {promise} A promise that resolves with all the project categories
 */
module.exports = () => {
  return ProjectCategory.find({})
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "project category query error");
    });
};
