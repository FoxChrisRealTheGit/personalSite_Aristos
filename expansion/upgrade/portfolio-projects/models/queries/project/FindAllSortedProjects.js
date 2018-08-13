const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the projects sorted in the Project collection.
 * @return {promise} A promise that resolves with all the projects sorted
 */
module.exports = () => {
  return Project.find({})
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};

