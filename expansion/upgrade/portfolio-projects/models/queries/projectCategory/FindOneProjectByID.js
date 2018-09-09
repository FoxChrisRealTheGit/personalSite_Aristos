const fs = require("fs-extra");
const ProjectCategories = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
).route;
const ProjectCategory = require(ProjectCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single project category in the Project Category collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the project category that matches the id
 */
module.exports = _id => {
  return ProjectCategory.findById(_id)
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "project category query error");
    });
};