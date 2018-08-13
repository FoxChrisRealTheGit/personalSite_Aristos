const ProjectCategory = require("../../projectCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Creates a single project category in the Project Category collection.
 * @param {object} pageProps - Object containing title, slug, description, keywords, author
 * @return {promise} A promise that resolves with the project category that was created
 */
module.exports = projectCategoryProps => {
  const projectCategory = new ProjectCategory(projectCategoryProps);
  return projectCategory.save().catch(err => {
    errorAddEvent(err, "project category query error");
  });
};

