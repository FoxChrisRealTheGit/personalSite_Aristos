const fs = require("fs-extra");
const BlogCategories = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelCategoryRoute.json"
).route;
const BlogCategory = require(BlogCategories);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single blog category in the Blog Category collection.
 * @param {object} blogCategoryProps - Object containing title, slug, description, keywords, author
 * @return {promise} A promise that resolves with the blog category that was created
 */
module.exports = blogCategoryProps => {
  const category = new BlogCategory(blogCategoryProps);
  return category.save().catch(err => {
    errorAddEvent(err, "blog category query error");
  });
};