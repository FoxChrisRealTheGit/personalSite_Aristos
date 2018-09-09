const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the blog categories sorted in the Blog Category collection.
 * @return {promise} A promise that resolves with the sorted blog categories
 */
module.exports = () => {
  return BlogCategory.find({})
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "blog category query error");
    });
};