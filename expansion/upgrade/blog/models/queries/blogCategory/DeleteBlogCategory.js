const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single blog collection from the Blog Category collection
 * @param {string} _id - The ID of the category to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return BlogCategory.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "blog category query error");
  });
};