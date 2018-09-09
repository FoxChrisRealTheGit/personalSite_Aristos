const fs = require("fs-extra");
const ProjectCategories = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
).route;
const ProjectCategory = require(ProjectCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single project category in the Project Category collection
 * @param {objectId} _id - The ID of the project category to edit.
 * @param {object} projectCategoryProps - An object with title, slug, description, keywords, author
 * @return {promise} A promise that resolves when the project category is edited
 */
module.exports = (_id, projectCategoryProps) => {
  return ProjectCategory.findByIdAndUpdate({ _id }, projectCategoryProps).catch(
    err => {
      errorAddEvent(err, "project category query error");
    }
  );
};