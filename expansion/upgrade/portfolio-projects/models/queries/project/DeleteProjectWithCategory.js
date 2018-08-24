const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single project from the Project collection
 * @param {objectID} _id - The ID of the project to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Project.remove({category: _id}).catch(err => {
    errorAddEvent(err, "project query error");
  });
};