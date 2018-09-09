const fs = require("fs-extra");
const ProjectCategories = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
).route;
const ProjectCategory = require(ProjectCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the project categories in the Project Category collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return ProjectCategory.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "project category query error");
    });
};