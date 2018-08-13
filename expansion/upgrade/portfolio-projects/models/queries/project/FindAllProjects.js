const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the projects in the Project collection.
 * @return {promise} A promise that resolves with all the projects
 */
module.exports = () => {
  return Project.find({}).catch(err => {
    errorAddEvent(err, "project query error");
  });
};

