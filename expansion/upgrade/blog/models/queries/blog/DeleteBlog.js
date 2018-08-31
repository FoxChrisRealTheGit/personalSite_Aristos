const fs = require("fs-extra");
const Blogs = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogModelMainRoute.json"
).route;
const Blog = require(Blogs);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Removes a single blog from the Blog collection
 * @param {string} _id - The ID of the blog to remove.
 * @return {promise} A promise that resolves when the Blog is removed
 */
module.exports = _id => {
  return Blog.findByIdAndRemove(_id).catch(err =>
    errorAddEvent(err, "blog query error")
  );
};