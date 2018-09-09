const fs = require("fs-extra");
let Blog;
try {
  const Blogs = fs.readJSONSync(
    "./expansion/upgrade/blog/routes/checkers/blogModelMainRoute.json"
  ).route;
  Blog = require(Blogs);
} catch (err) {
  Blog = require("../../blog");
}
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds all blogs in the Blog collection sorted by their sorting value.
 * @return {promise} A promise that resolves with all the sorted blogs
 */
module.exports = () => {
  return Blog.find({})
    .sort({ sorting: 1 })
    .populate({path: "author"})
    .populate({path:"category"})
    .catch(err => {
      errorAddEvent(err, "blog query error");
    });
};