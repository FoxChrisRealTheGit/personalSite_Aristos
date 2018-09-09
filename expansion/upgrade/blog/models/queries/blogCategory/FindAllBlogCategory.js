const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the blog categories in the Blog Category collection.
 * @return {promise} A promise that resolves with all the blog categories
 */
module.exports = () => {
  return BlogCategory.find({}).catch(err => {
    errorAddEvent(err, "blog category query error");
  });
};