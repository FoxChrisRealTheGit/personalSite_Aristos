const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single project in the Project collection.
 * @param {objectID} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the project that matches the id
 */
module.exports = _id => {
  return Project.findById(_id).catch(err => {
    errorAddEvent(err, "project query error");
  });
};

