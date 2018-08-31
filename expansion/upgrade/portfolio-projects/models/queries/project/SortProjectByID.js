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
 * Sorts projects by ids.
 * @param {string} ids - The ids of the projects to sort.
 * @return {promise} A promise that resolves with the sorted projects
 */
module.exports = ids => {
  return sortProjects(ids, function() {
    Project.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "project query error");
      });
  });
}; //* end of exports */
/* Sort pages function */
/* rebuild so that projects sort in category view use all projects id to not mess up ordering */
function sortProjects(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Project.findById(id).then(project => {
        project.sorting = count;
        project.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort projects function */