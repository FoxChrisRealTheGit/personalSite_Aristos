const fs = require("fs-extra");
const ProjectCategories = fs.readJSONSync(
  "./expansion/upgrade/portfolio-projects/routes/checkers/portfolioCategoryModelRoutes.json"
).route;
const ProjectCategory = require(ProjectCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts project categories by ids.
 * @param {string} ids - The ids of the project categories to sort with.
 * @return {promise} A promise that resolves with the sorted project categories
 */
module.exports = ids => {
  return sortProjectCategories(ids, function() {
    ProjectCategory.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "project category query error");
      });
  });
}; /* end of exports */
/* Sort project categories function */
/* rebuild so that project categories sort in category view use all pages id to not mess up ordering */
function sortProjectCategories(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      ProjectCategory.findById(id).then(cat => {
        cat.sorting = count;
        cat.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort project categories function */