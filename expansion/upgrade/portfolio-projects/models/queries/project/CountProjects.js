const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the projects in the Project collection.
 * @return {promise} A promise that resolves with the count of the projects
 */
module.exports = () => {
  return Project.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};

