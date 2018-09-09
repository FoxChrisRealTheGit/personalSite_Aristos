const fs = require("fs-extra");
const ProjectCategories = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
).route;
const ProjectCategory = require(ProjectCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single project category from the Project Category collection
 * @param {objectID} _id - The ID of the project category to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return ProjectCategory.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "project category query error");
  });
};