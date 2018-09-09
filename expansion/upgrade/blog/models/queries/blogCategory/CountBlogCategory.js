const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * counts the blog category in the Blog Category collection.
 * @return {promise} A promise that resolves with the Bog Category that was created
 */
module.exports = () => {
  return BlogCategory.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "blog category query error");
    });
};