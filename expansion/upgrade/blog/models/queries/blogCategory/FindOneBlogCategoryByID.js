const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single blog category in the Blog Category collection.
 * @param {objectID} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = _id => {
  return BlogCategory.findById(_id).catch(err => {
    errorAddEvent(err, "blog category query error");
  });
};