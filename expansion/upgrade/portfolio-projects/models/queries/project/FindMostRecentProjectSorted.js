const Project = require("../../project");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the most recent project in the Project collection.
 * @return {promise} A promise that resolves with the msot recent project
 */
module.exports = () => {
  return Project.find({})
    .sort({ sorting: 1 })
    .populate("category")
    .populate("author")
    .limit(1)
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};
