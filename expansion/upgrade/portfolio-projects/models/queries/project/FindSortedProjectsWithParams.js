const fs = require("fs-extra");
let Project;
try{
const Projects = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioModelRoutes.json"
).route;
Project = require(Projects);
}catch(err){
Project = require("../../project");
}
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the sorted projects based on a param in the Project collection.
 * @param {object} stuff - The stuff to sort by.
 * @return {promise} A promise that resolves with the sorted projects based on the stuff param
 */
module.exports = stuff => {
  return Project.find(stuff)
    .sort({ sorting: 1 })
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "project query error");
    });
};